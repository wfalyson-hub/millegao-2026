const { solutions, cases } = window.SITE_CONTENT;
const solutionList = document.querySelector("#solution-list");
const caseGrid = document.querySelector("#case-grid");
const filters = document.querySelector("#case-filters");
const searchInput = document.querySelector("#case-search");
const emptyState = document.querySelector("#empty-state");
let activeFilter = "全部";

solutionList.innerHTML = solutions.map(item => `
  <article class="solution-card" data-solution="${item.id}" tabindex="0">
    <span class="solution-number">${item.number}</span>
    <div class="solution-title"><h3>${item.title}</h3><small>${item.en}</small></div>
    <div class="solution-detail">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <p>${item.description}</p>
    </div>
    <span class="solution-arrow">↗</span>
  </article>
`).join("");

const categories = ["全部", ...new Set(cases.map(item => item.category))];
filters.innerHTML = categories.map(category => `<button class="filter-button ${category === "全部" ? "active" : ""}" data-filter="${category}" type="button">${category}</button>`).join("");

function searchableText(item) {
  return [item.title, item.category, item.description, item.scale, ...item.tags].join(" ").toLowerCase();
}

const searchAliases = {
  "商场": ["商业", "中庭", "品牌"],
  "购物中心": ["商业", "中庭"],
  "景区": ["文旅", "夜游", "户外"],
  "博物馆": ["展馆", "展厅", "多媒体"],
  "企业馆": ["展馆", "展厅"],
  "酒店": ["宴会", "餐厅"],
  "婚礼": ["婚纱", "宴会"],
  "舞台": ["演艺", "活动", "纱幕"],
  "好玩": ["互动", "体感", "体验"],
  "小朋友": ["亲子", "互动"],
  "大屏": ["裸眼3D", "全米屏", "多屏"]
};
function queryTerms(query) {
  const terms = [query];
  Object.entries(searchAliases).forEach(([phrase, aliases]) => {
    if (query.includes(phrase)) terms.push(...aliases);
  });
  return terms.filter(Boolean);
}

function renderCases() {
  const query = searchInput.value.trim().toLowerCase();
  const terms = queryTerms(query);
  const visible = cases.filter(item => {
    const text = searchableText(item);
    return (activeFilter === "全部" || item.category === activeFilter) && (!query || terms.some(term => text.includes(term)));
  });
  caseGrid.innerHTML = visible.map(item => `
    <article class="case-card" data-case="${item.id}" tabindex="0">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="case-overlay">
        <small>${item.category} · ${item.scale}</small>
        <h3>${item.title}</h3>
        <p>${item.tags.join(" / ")}</p>
      </div>
    </article>
  `).join("");
  emptyState.hidden = visible.length > 0;
}
renderCases();

filters.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;
  activeFilter = button.dataset.filter;
  filters.querySelectorAll("button").forEach(item => item.classList.toggle("active", item === button));
  renderCases();
});
searchInput.addEventListener("input", renderCases);

solutionList.addEventListener("click", event => {
  const card = event.target.closest(".solution-card");
  if (!card) return;
  const solution = solutions.find(item => item.id === card.dataset.solution);
  activeFilter = solution?.id === "culture" ? "文旅夜游" :
    solution?.id === "commercial" ? "商业空间" :
    solution?.id === "museum" ? "展馆展厅" :
    solution?.id === "dining" ? "餐饮宴会" :
    solution?.id === "stage" ? "舞台演艺" :
    solution?.id === "interactive" ? "互动装置" : "全部";
  searchInput.value = "";
  filters.querySelectorAll("button").forEach(item => item.classList.toggle("active", item.dataset.filter === activeFilter));
  renderCases();
  document.querySelector("#cases").scrollIntoView();
});
solutionList.addEventListener("keydown", event => {
  if (event.key === "Enter") event.target.click();
});

const dialog = document.querySelector("#case-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogCategory = document.querySelector("#dialog-category");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
const dialogTags = document.querySelector("#dialog-tags");
function openCase(id) {
  const item = cases.find(entry => entry.id === Number(id));
  if (!item) return;
  dialogImage.src = item.image;
  dialogImage.alt = item.title;
  dialogCategory.textContent = `${item.category} · ${item.scale}`;
  dialogTitle.textContent = item.title;
  dialogDescription.textContent = `${item.description} 正式上线前可继续补充项目地点、年份、客户需求、实施范围与成果数据。`;
  dialogTags.innerHTML = item.tags.map(tag => `<span>${tag}</span>`).join("");
  dialog.showModal();
}
caseGrid.addEventListener("click", event => {
  const card = event.target.closest(".case-card");
  if (card) openCase(card.dataset.case);
});
caseGrid.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    const card = event.target.closest(".case-card");
    if (card) openCase(card.dataset.case);
  }
});
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 30), { passive: true });
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
nav.addEventListener("click", event => {
  if (event.target.closest("a,button")) {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

const aiPanel = document.querySelector("#ai-panel");
const aiMessages = document.querySelector("#ai-messages");
const aiForm = document.querySelector("#ai-form");
const aiQuestion = document.querySelector("#ai-question");
const quickPrompts = document.querySelector("#quick-prompts");
const consultation = { type: "", city: "", area: "", budget: "", schedule: "", contact: "" };
const prompts = ["你们主要做什么？", "推荐商业空间案例", "我想做文旅夜游", "生成需求摘要"];

function appendMessage(text, type = "bot") {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  aiMessages.appendChild(message);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}
function openAI() {
  if (dialog.open) dialog.close();
  aiPanel.classList.add("open");
  aiPanel.setAttribute("aria-hidden", "false");
  document.body.classList.add("panel-open");
  if (!aiMessages.children.length) {
    appendMessage("你好，我是米乐高智能项目顾问。\n我可以介绍业务、推荐相关案例，或帮你整理项目需求。你现在想了解哪一类空间？");
  }
  setTimeout(() => aiQuestion.focus(), 250);
}
function closeAI() {
  aiPanel.classList.remove("open");
  aiPanel.setAttribute("aria-hidden", "true");
  document.body.classList.remove("panel-open");
}
document.querySelectorAll(".ai-open").forEach(button => button.addEventListener("click", openAI));
document.querySelector(".ai-close").addEventListener("click", closeAI);
quickPrompts.innerHTML = prompts.map(text => `<button type="button">${text}</button>`).join("");
quickPrompts.addEventListener("click", event => {
  if (!event.target.matches("button")) return;
  respond(event.target.textContent);
});

function findCaseRecommendation(text) {
  const lowered = text.toLowerCase();
  const scores = cases.map(item => ({
    item,
    score: item.tags.concat(item.category, item.title).reduce((score, keyword) => score + (lowered.includes(keyword.toLowerCase()) ? 1 : 0), 0)
  })).sort((a,b) => b.score - a.score);
  return scores[0].score ? scores.slice(0,3).map(entry => entry.item) : [];
}
function captureBrief(text) {
  if (/文旅|夜游|景区|山体|建筑/.test(text)) consultation.type = "文旅夜游与户外光影";
  if (/商业|商场|中庭|品牌|门店/.test(text)) consultation.type = "商业空间与品牌体验";
  if (/展馆|展厅|博物馆|企业馆/.test(text)) consultation.type = "展馆展厅与数字多媒体";
  if (/餐厅|宴会|婚礼|酒店/.test(text)) consultation.type = "沉浸式餐厅与5D宴会厅";
  const area = text.match(/(\d+(?:\.\d+)?)\s*(?:㎡|平米|平方米)/);
  if (area) consultation.area = `${area[1]}㎡`;
  const budget = text.match(/预算.{0,4}?(\d+(?:\.\d+)?)\s*(万|万元|元)/);
  if (budget) consultation.budget = `${budget[1]}${budget[2]}`;
  const city = text.match(/(?:在|项目在|位于)([\u4e00-\u9fa5]{2,8})(?:市|做|有|，|,|\s)/);
  if (city) consultation.city = city[1];
}
function smartReply(text) {
  captureBrief(text);
  const recommendation = findCaseRecommendation(text);
  if (/摘要|整理需求/.test(text)) {
    const summary = [
      consultation.type && `项目类型：${consultation.type}`,
      consultation.city && `项目城市：${consultation.city}`,
      consultation.area && `空间面积：${consultation.area}`,
      consultation.budget && `预算范围：${consultation.budget}`,
      consultation.schedule && `计划时间：${consultation.schedule}`
    ].filter(Boolean);
    return summary.length
      ? `当前需求摘要：\n${summary.join("\n")}\n待补充：联系人、计划时间与希望实现的核心体验。确认后可提交给人工项目顾问。`
      : "目前还没有足够的信息生成摘要。请先告诉我项目类型、城市、面积、预算范围和计划时间。";
  }
  if (/价格|报价|多少钱|费用|预算/.test(text)) {
    return "项目价格会受到现场尺寸、内容量、设备配置、施工条件和工期影响，我不会在信息不足时给出不可靠报价。你可以告诉我项目类型、城市、面积和预算范围，我会整理后转交人工顾问评估。";
  }
  if (/工期|多久|时间/.test(text)) {
    return "工期需要结合现场条件、内容制作量与设备配置由项目顾问确认。通常会经过需求澄清、创意方案、深化设计、制作实施和交付运营五个阶段。你的计划开业或活动时间是什么时候？";
  }
  if (/主要做什么|业务|能做什么|介绍/.test(text)) {
    return "米乐高提供六类综合方案：文旅夜游、商业空间、展馆展厅、沉浸餐饮与宴会、舞台活动、互动娱乐与数字装置。能力覆盖创意策划、数字内容、技术集成、工程实施和运维支持。";
  }
  if (/启动|流程|合作|怎么做/.test(text)) {
    return "可以先提供项目类型、城市、面积、预算范围和计划时间。我们会先澄清需求，再进入创意方案、深化设计、制作实施与交付运营。即使需求还比较模糊，也可以先从应用场景开始聊。";
  }
  if (/人工|电话|联系|顾问/.test(text)) {
    return "可以直接联系项目顾问：028-8859 2078 或 187 8028 5932；也可以在页面底部提交项目需求。";
  }
  if (recommendation.length) {
    return `根据你的描述，可以先参考：${recommendation.map(item => `《${item.title}》`).join("、")}。\n为了进一步判断方案，请再告诉我项目城市、空间面积、预算范围和计划时间。`;
  }
  if (consultation.type || consultation.area || consultation.budget) {
    const known = [
      consultation.type && `类型：${consultation.type}`,
      consultation.city && `城市：${consultation.city}`,
      consultation.area && `面积：${consultation.area}`,
      consultation.budget && `预算：${consultation.budget}`
    ].filter(Boolean).join("；");
    return `我已记录 ${known}。\n还可以补充计划时间和希望达到的体验效果，我会继续整理为项目需求摘要。`;
  }
  return "我可以根据场景推荐相关方案。你可以像这样描述：项目在什么城市、属于景区/商场/展馆/餐饮/活动中的哪一类、大约多大、希望什么时候完成。";
}
function respond(text) {
  const value = text.trim();
  if (!value) return;
  appendMessage(value, "user");
  aiQuestion.value = "";
  setTimeout(() => appendMessage(smartReply(value)), 260);
}
aiForm.addEventListener("submit", event => {
  event.preventDefault();
  respond(aiQuestion.value);
});
aiQuestion.addEventListener("keydown", event => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    aiForm.requestSubmit();
  }
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
contactForm.addEventListener("submit", event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(contactForm));
  const records = JSON.parse(localStorage.getItem("miracle-leads") || "[]");
  records.push({ ...data, source: "官网项目表单", createdAt: new Date().toISOString() });
  localStorage.setItem("miracle-leads", JSON.stringify(records));
  formStatus.textContent = "需求已保存在当前浏览器的演示记录中。正式上线时将接入公司邮箱、CRM或企业微信。";
  contactForm.reset();
});
