"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FormEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { cases, faqs, solutions } from "@/lib/content";

const filters = ["全部", ...Array.from(new Set(cases.map((item) => item.category)))];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${basePath}${path}`;

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

export function HomeExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("全部");
  const [selectedCase, setSelectedCase] = useState<(typeof cases)[number] | null>(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [messages, setMessages] = useState(["你好，我是米乐高智能项目顾问。可以介绍业务、推荐案例并帮你整理需求。"]);
  const [question, setQuestion] = useState("");

  const visibleCases = useMemo(
    () => activeFilter === "全部" ? cases : cases.filter((item) => item.category === activeFilter),
    [activeFilter]
  );

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          desktop: "(min-width: 901px) and (pointer: fine)",
          compact: "(max-width: 900px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        ({ conditions }) => {
          const { desktop, reduceMotion } = conditions as {
            desktop: boolean;
            compact: boolean;
            reduceMotion: boolean;
          };

          if (reduceMotion) {
            gsap.set(".reveal", { clearProps: "all" });
            return;
          }

          const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
          intro
            .from(".header", { y: -24, autoAlpha: 0, duration: 0.7, clearProps: "transform,opacity,visibility" })
            .from(".hero .kicker", { x: -24, autoAlpha: 0, duration: 0.6 }, 0.15)
            .from(".hero-line", { yPercent: 105, autoAlpha: 0, rotateX: -10, duration: 1, stagger: 0.12 }, 0.2)
            .from(".hero .lead", { y: 22, autoAlpha: 0, duration: 0.7 }, 0.55)
            .from(".hero-actions > *", { y: 16, autoAlpha: 0, duration: 0.55, stagger: 0.1 }, 0.68)
            .from(".hero-metrics", { x: 35, autoAlpha: 0, duration: 0.75 }, 0.72)
            .from(".scroll-cue", { autoAlpha: 0, duration: 0.55 }, 0.9);

          gsap.to(".scroll-progress", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.25 },
          });

          gsap.utils.toArray<HTMLElement>(".section-head, .narrative-title").forEach((heading) => {
            gsap.from(heading, {
              y: 34,
              autoAlpha: 0,
              clipPath: "inset(0 0 24% 0)",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: heading, start: "top 84%", once: true },
            });
          });

          gsap.utils.toArray<HTMLElement>(".narrative-copy, .about-copy, .contact-copy, .contact-form").forEach((block, index) => {
            gsap.from(block, {
              x: index % 2 === 0 ? 34 : -34,
              autoAlpha: 0,
              duration: 0.85,
              ease: "power2.out",
              scrollTrigger: { trigger: block, start: "top 86%", once: true },
            });
          });

          ScrollTrigger.batch(".solution-row", {
            start: "top 88%",
            once: true,
            onEnter: (items) => gsap.from(items, {
              x: desktop ? -42 : 0,
              y: desktop ? 0 : 24,
              rotateY: desktop ? -3 : 0,
              autoAlpha: 0,
              duration: 0.78,
              stagger: 0.1,
              ease: "power3.out",
              clearProps: "transform",
            }),
          });

          ScrollTrigger.batch(".case-tile", {
            start: "top 90%",
            once: true,
            onEnter: (items) => gsap.from(items, {
              y: 42,
              autoAlpha: 0,
              clipPath: "inset(8% 0 8% 0 round 18px)",
              duration: 0.82,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "clipPath",
            }),
          });

          ScrollTrigger.batch(".capability-card", {
            start: "top 88%",
            once: true,
            onEnter: (items) => gsap.from(items, {
              y: 30,
              autoAlpha: 0,
              duration: 0.68,
              stagger: 0.08,
              ease: "back.out(1.25)",
            }),
          });

          gsap.from(".ai-demo", {
            x: 45,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ".ai-stage", start: "top 72%", once: true },
          });

          gsap.from(".about-image", {
            scale: 0.96,
            autoAlpha: 0,
            clipPath: "inset(9% 6% 9% 6% round 24px)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".about", start: "top 76%", once: true },
          });

          if (desktop) {
            gsap.to(".hero video", {
              yPercent: 9,
              scale: 1.045,
              ease: "none",
              scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 },
            });
            gsap.to(".hero-grid", {
              yPercent: 14,
              opacity: 0.05,
              ease: "none",
              scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 },
            });
            gsap.to(".ai-light", {
              xPercent: 65,
              yPercent: -15,
              ease: "none",
              scrollTrigger: { trigger: ".ai-stage", start: "top bottom", end: "bottom top", scrub: 1.2 },
            });
          }
        }
      );

      const glassCards = root.querySelectorAll<HTMLElement>(".glass");
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      if (finePointer) {
        glassCards.forEach((card) => {
          const move = (event: PointerEvent) => {
            const bounds = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
            card.style.setProperty("--my", `${event.clientY - bounds.top}px`);
          };
          card.addEventListener("pointermove", move);
          card.dataset.pointerListener = "true";
          (card as HTMLElement & { _move?: (event: PointerEvent) => void })._move = move;
        });
      }
    }, root);

    return () => {
      root.querySelectorAll<HTMLElement>("[data-pointer-listener]").forEach((card) => {
        const move = (card as HTMLElement & { _move?: (event: PointerEvent) => void })._move;
        if (move) card.removeEventListener("pointermove", move);
      });
      media.revert();
      context.revert();
    };
  }, []);

  useEffect(() => {
    if (!selectedCase) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timeline = gsap.timeline();
    timeline
      .fromTo(".modal-backdrop", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.24, ease: "power2.out" })
      .from(".case-modal", { scale: 0.965, y: 20, clipPath: "inset(9% 12% round 28px)", duration: 0.55, ease: "power3.out" }, 0.04)
      .from(".modal-image img", { scale: 1.08, duration: 0.75, ease: "power2.out" }, 0.08)
      .from(".modal-copy > *", { y: 16, autoAlpha: 0, duration: 0.42, stagger: 0.055, ease: "power2.out" }, 0.18);
    return () => {
      timeline.kill();
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedCase]);

  function askAI(text: string) {
    const query = text.trim();
    if (!query) return;
    const reply = /报价|多少钱|价格/.test(query)
      ? "价格需要结合现场尺寸、内容量、设备配置和施工条件由人工顾问确认。你可以补充城市、面积、预算范围和计划时间。"
      : /商业|商场|中庭/.test(query)
        ? "商业空间可优先考虑裸眼3D、轨道数字装置和地面互动。案例墙中《商业裸眼3D视觉》《轨道数字装置》可作为参考。"
        : /文旅|景区|夜游/.test(query)
          ? "文旅项目通常从地域文化、游线和运营目标出发，可组合建筑投影、山体光影、水幕演艺与互动节点。"
          : "米乐高覆盖文旅、商业、展馆、餐饮宴会、舞台演艺与互动装置。请告诉我项目类型、城市、面积和计划时间，我会继续整理。";
    setMessages((current) => [...current, `你：${query}`, `智能顾问：${reply}`]);
    setQuestion("");
  }

  function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    form.reset();
    const status = form.querySelector("[data-status]");
    if (status) status.textContent = "需求已记录。正式部署时可接入企业微信、邮箱或 CRM。";
  }

  return (
    <main ref={rootRef}>
      <div className="scroll-progress" aria-hidden="true" />
      <header className={`header ${menuOpen ? "menu-open" : ""}`}>
        <a className="logo" href="#top" aria-label="米乐高首页">
          <Image src={asset("/images/millegao-logo-dark.png")} alt="米乐高图像科技" width={1530} height={450} priority />
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}><i /><i /><span>菜单</span></button>
        <nav>
          <a href="#solutions" onClick={() => setMenuOpen(false)}>解决方案</a>
          <a href="#cases" onClick={() => setMenuOpen(false)}>案例墙</a>
          <a href="#capability" onClick={() => setMenuOpen(false)}>核心能力</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>关于我们</a>
          <button onClick={() => setAiOpen(true)}>AI 智能咨询</button>
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>启动项目</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <video autoPlay muted loop playsInline poster={asset("/images/case-mountain.jpg")}>
          <source src={asset("/video/hero.mp4")} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="aurora aurora-a" /><div className="aurora aurora-b" />
        <div className="hero-grid" />
        <div className="hero-copy">
          <p className="kicker"><span /> DIGITAL LIGHT · IMMERSIVE SPACE</p>
          <h1><span className="hero-line">让空间被看见</span><span className="hero-line"><em>让体验真正发生</em></span></h1>
          <p className="lead">融合文化内容、数字视觉与互动科技，为文旅、商业、展馆、餐饮和活动空间创造值得到场的体验。</p>
          <div className="hero-actions">
            <a className="primary-button" href="#solutions">探索解决方案 <b>↗</b></a>
            <button className="glass-button" onClick={() => setAiOpen(true)}>描述你的项目</button>
          </div>
        </div>
        <div className="hero-metrics glass">
          <div><strong>06</strong><span>核心场景方案</span></div>
          <div><strong>05</strong><span>阶段完整交付</span></div>
          <div><strong>AI</strong><span>智能需求引导</span></div>
        </div>
        <a className="scroll-cue" href="#narrative"><i /> SCROLL</a>
      </section>

      <section className="narrative section" id="narrative">
        <Reveal className="narrative-title">
          <p className="kicker">WHAT WE CREATE</p>
          <h2>技术不是终点。<br />人与空间产生连接，才是。</h2>
        </Reveal>
        <Reveal className="narrative-copy">
          <p>我们将文化表达、空间设计、数字内容与工程技术放入同一套项目逻辑，让一个模糊想法逐步成为可实施、可运营、可持续更新的体验。</p>
          <div className="trust-line"><span>真实项目素材</span><span>全流程协同</span><span>服务全国</span><span>人工审核</span></div>
        </Reveal>
      </section>

      <section className="solutions section" id="solutions">
        <Reveal className="section-head">
          <div><p className="kicker">SIX SOLUTIONS</p><h2>从场景出发，<br />建立体验的完整路径</h2></div>
          <p>六类业务彼此独立，又可以组合为完整项目。每类首期展示少量代表案例，后续通过数据持续增加。</p>
        </Reveal>
        <div className="solution-stack">
          {solutions.map((item) => (
            <Reveal className="solution-row glass" key={item.id}>
              <span className="solution-index">{item.index}</span>
              <div className="solution-image"><Image src={asset(item.image)} alt={item.title} fill sizes="(max-width: 768px) 90vw, 300px" /></div>
              <div className="solution-content">
                <small>{item.english}</small><h3>{item.title}</h3><p>{item.summary}</p>
                <div className="tag-list">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <a href="#cases" aria-label={`查看${item.title}案例`}>↗</a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="case-section section" id="cases">
        <Reveal className="section-head">
          <div><p className="kicker">SELECTED WORK</p><h2>案例展示墙</h2></div>
          <p>用真实现场回答“能不能做”。选择一个场景，快速查看相关项目方向。</p>
        </Reveal>
        <div className="case-filters">
          {filters.map((filter) => <button key={filter} className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
        </div>
        <div className="case-wall">
          {visibleCases.map((item, index) => (
            <Reveal className={`case-tile ${item.featured && index < 6 ? "featured" : ""}`} key={item.id}>
              <button onClick={() => setSelectedCase(item)}>
                <Image src={asset(item.image)} alt={item.title} fill sizes="(max-width: 700px) 100vw, 50vw" />
                <span className="case-shade" />
                <span className="case-meta"><small>{item.category}</small><strong>{item.title}</strong><em>{item.tags.join(" · ")}</em></span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="capability section" id="capability">
        <Reveal className="section-head">
          <div><p className="kicker">INTEGRATED CAPABILITY</p><h2>一支团队，贯通创意到落地</h2></div>
        </Reveal>
        <div className="capability-grid">
          {[
            ["01", "创意策划", "项目定位、文化挖掘、体验脚本与空间叙事"],
            ["02", "数字内容", "三维动画、视觉影片、交互内容与长期更新"],
            ["03", "技术集成", "投影、全息、裸眼3D、AR/VR与感应交互"],
            ["04", "工程实施", "深化设计、设备选型、安装调试与现场联动"],
            ["05", "运营运维", "交付培训、系统巡检、活动保障与内容升级"]
          ].map(([number, title, text]) => <Reveal className="capability-card glass" key={number}><span>{number}</span><i /><h3>{title}</h3><p>{text}</p></Reveal>)}
        </div>
      </section>

      <section className="ai-stage section">
        <div className="ai-light" />
        <Reveal className="ai-stage-copy"><p className="kicker">SMART PROJECT GUIDE</p><h2>先把需求说清楚，<br />再让方案走得更快。</h2><p>智能顾问帮助客户认识业务、匹配案例并整理项目线索。涉及价格、工期和配置时，由人工顾问确认。</p><button className="primary-button" onClick={() => setAiOpen(true)}>开始智能咨询 ↗</button></Reveal>
        <Reveal className="ai-demo glass"><p><span>访客</span>约 2000㎡ 的商业中庭，想做吸引客流的互动体验。</p><p><span>智能顾问</span>建议从裸眼3D主视觉、轨道装置和地面互动组合入手。我可以先整理城市、预算和计划时间。</p></Reveal>
      </section>

      <section className="about section" id="about">
        <Reveal className="about-image"><Image src={asset("/images/company-studio.jpg")} alt="米乐高公司环境" fill sizes="(max-width: 800px) 100vw, 55vw" /></Reveal>
        <Reveal className="about-copy"><p className="kicker">ABOUT MILLEGAO</p><h2>懂内容，<br />也懂现场。</h2><p>米乐高专注数字视觉与沉浸式体验，通过创意策划、数字内容、互动技术和工程实施，为不同空间建立具有传播力与参与感的体验。</p><a href="#contact">与项目顾问沟通 ↗</a></Reveal>
      </section>

      <section className="faq section">
        <Reveal className="section-head"><div><p className="kicker">CLEAR ANSWERS</p><h2>合作前，客户通常会问</h2></div></Reveal>
        <div className="faq-list">{faqs.map(([q, a], index) => <details key={q} open={index === 0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
      </section>

      <section className="contact section" id="contact">
        <Reveal className="contact-copy"><p className="kicker">START A PROJECT</p><h2>下一处令人停留的空间，<br />可以从这里开始。</h2><a href="tel:02888592078">028-8859 2078</a><a href="tel:18780285932">187 8028 5932</a></Reveal>
        <Reveal>
          <form className="contact-form glass" onSubmit={submitLead}>
            <label>称呼 / 公司<input required name="name" placeholder="怎么称呼您？" /></label>
            <label>联系电话<input required name="phone" placeholder="便于项目顾问联系" /></label>
            <label>项目类型<select name="type">{solutions.map((item) => <option key={item.id}>{item.title}</option>)}</select></label>
            <label>项目简述<textarea name="brief" rows={4} placeholder="城市、面积、预算、时间或希望实现的效果" /></label>
            <label className="consent"><input required type="checkbox" /> 同意仅将信息用于本次项目沟通</label>
            <button className="primary-button">提交项目需求 ↗</button><p data-status className="form-status" />
          </form>
        </Reveal>
      </section>

      <footer><Image src={asset("/images/millegao-logo-dark.png")} alt="米乐高图像科技" width={1530} height={450} /><p>数字光影与沉浸式空间综合解决方案</p><nav><a href="#solutions">解决方案</a><a href="#cases">案例墙</a><a href="#capability">核心能力</a><a href="#contact">联系</a></nav><small>© 2026 成都米乐高图像科技有限公司</small></footer>

      {selectedCase && <div className="modal-backdrop" onClick={() => setSelectedCase(null)}><article className="case-modal glass" onClick={(event) => event.stopPropagation()}><button onClick={() => setSelectedCase(null)}>×</button><div className="modal-image"><Image src={asset(selectedCase.image)} alt={selectedCase.title} fill /></div><div className="modal-copy"><small>{selectedCase.category}</small><h2>{selectedCase.title}</h2><p>{selectedCase.summary}</p><div className="tag-list">{selectedCase.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="primary-button" href="#contact" onClick={() => setSelectedCase(null)}>咨询类似项目 ↗</a></div></article></div>}

      <button className="ai-fab glass" onClick={() => setAiOpen(true)}><i /> AI 智能咨询</button>
      <aside className={`ai-panel glass ${aiOpen ? "open" : ""}`} aria-hidden={!aiOpen}>
        <header><div><i /><strong>米乐高智能顾问</strong><small>基于已审核的业务知识</small></div><button onClick={() => setAiOpen(false)}>×</button></header>
        <div className="messages">{messages.map((message, index) => <p key={`${message}-${index}`} className={message.startsWith("你：") ? "user" : ""}>{message}</p>)}</div>
        <div className="quick-actions">{["你们主要做什么？", "推荐商业空间案例", "我想做文旅夜游"].map((item) => <button key={item} onClick={() => askAI(item)}>{item}</button>)}</div>
        <form onSubmit={(event) => { event.preventDefault(); askAI(question); }}><textarea value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="描述项目，或问我能做什么" /><button>↑</button></form>
        <small>AI 不提供未经人工确认的价格、工期或效果承诺。</small>
      </aside>
    </main>
  );
}
