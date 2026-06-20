export type Solution = {
  id: string;
  index: string;
  title: string;
  english: string;
  summary: string;
  image: string;
  tags: string[];
};

export type CaseItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  summary: string;
  tags: string[];
  featured?: boolean;
};

export const solutions: Solution[] = [
  { id: "culture", index: "01", title: "文旅夜游与户外光影", english: "CULTURAL TOURISM", summary: "以地域文化为内容原点，用建筑、山体、水幕与夜游动线，建立可传播、可运营的夜间体验。", image: "/images/case-cultural-building.jpg", tags: ["建筑投影", "山体光影", "水幕演艺"] },
  { id: "commercial", index: "02", title: "商业空间与品牌体验", english: "COMMERCIAL EXPERIENCE", summary: "围绕引流、停留与品牌表达，为商业综合体、品牌门店和公共空间设计数字体验。", image: "/images/case-naked-eye-3d.png", tags: ["裸眼3D", "品牌互动", "主题活动"] },
  { id: "museum", index: "03", title: "展馆展厅与数字多媒体", english: "DIGITAL EXHIBITION", summary: "把信息展示转化为空间叙事，整合全息、CAVE、数字沙盘与多点交互系统。", image: "/images/case-cave.png", tags: ["CAVE空间", "全息成像", "数字沙盘"] },
  { id: "dining", index: "04", title: "沉浸式餐厅与5D宴会厅", english: "IMMERSIVE DINING", summary: "让空间氛围、主题内容与宴会流程同步变化，创造完整的沉浸式餐叙体验。", image: "/images/case-immersive-dining.jpg", tags: ["环幕投影", "餐桌互动", "婚纱投影"] },
  { id: "stage", index: "05", title: "舞台活动与视觉演艺", english: "LIVE VISUAL", summary: "为发布会、节庆与大型活动提供舞台视觉、异形投影和实时内容控制。", image: "/images/case-gauze-stage.jpg", tags: ["舞台视觉", "纱幕投影", "实时控制"] },
  { id: "interactive", index: "06", title: "互动娱乐与数字装置", english: "INTERACTIVE INSTALLATION", summary: "通过动作、触摸、声音与位置感应，让观众从观看者成为体验的参与者。", image: "/images/case-interactive-ground.jpg", tags: ["体感互动", "地面互动", "感应装置"] }
];

export const cases: CaseItem[] = [
  { id: 1, title: "建筑光影叙事", category: "文旅夜游", image: "/images/case-cultural-building.jpg", summary: "以建筑立面为画布，结合空间结构完成大尺度文化叙事。", tags: ["建筑投影", "户外光影"], featured: true },
  { id: 2, title: "山体主题光影", category: "文旅夜游", image: "/images/case-mountain.jpg", summary: "利用自然山体与夜间环境，构建具有地标感的户外场景。", tags: ["山体投影", "夜游"] },
  { id: 3, title: "水幕沉浸光影", category: "文旅夜游", image: "/images/case-water-screen.jpg", summary: "以水雾承载影像，结合灯光形成轻盈的户外奇观。", tags: ["水幕投影", "灯光联动"] },
  { id: 4, title: "商业裸眼3D视觉", category: "商业空间", image: "/images/case-naked-eye-3d.png", summary: "为商业空间构建高辨识度数字地标与社交传播画面。", tags: ["裸眼3D", "商业中庭"], featured: true },
  { id: 5, title: "全米屏数字体验", category: "商业空间", image: "/images/case-full-screen.jpg", summary: "通过多面显示与内容联动，打造包裹式数字空间。", tags: ["全米屏", "多屏联动"] },
  { id: 6, title: "CAVE沉浸空间", category: "展馆展厅", image: "/images/case-cave.png", summary: "多面立体显示与实时内容系统构成可探索的沉浸空间。", tags: ["CAVE", "空间交互"], featured: true },
  { id: 7, title: "数字幻影展示", category: "展馆展厅", image: "/images/case-hologram.png", summary: "将实体展项与虚拟影像结合，强化产品和知识讲解。", tags: ["幻影成像", "虚实结合"] },
  { id: 8, title: "星河沉浸餐厅", category: "餐饮宴会", image: "/images/case-immersive-dining.jpg", summary: "以环幕内容和空间灯光联动，为餐叙建立主题变化。", tags: ["沉浸餐厅", "环幕投影"], featured: true },
  { id: 9, title: "5D沉浸宴会厅", category: "餐饮宴会", image: "/images/case-banquet.jpg", summary: "覆盖穹顶与舞台的视觉系统，服务婚礼与主题活动。", tags: ["宴会厅", "穹顶投影"] },
  { id: 10, title: "纱幕舞台影像", category: "舞台演艺", image: "/images/case-gauze-stage.jpg", summary: "叠加人物与虚拟画面，形成层次丰富的舞台视觉。", tags: ["纱幕投影", "数字演艺"] },
  { id: 11, title: "轨道数字装置", category: "互动装置", image: "/images/case-rail-screen.png", summary: "屏幕随轨道位置自动呈现对应的数字内容。", tags: ["轨道镜", "位置感应"] },
  { id: 12, title: "公共空间地面互动", category: "互动装置", image: "/images/case-interactive-ground.jpg", summary: "捕捉参与者动作，让地面成为多人参与的数字画布。", tags: ["地面互动", "体感识别"], featured: true }
];

export const faqs = [
  ["米乐高主要提供哪些服务？", "提供文旅夜游、商业空间、展馆展厅、沉浸餐饮宴会、舞台视觉和互动数字装置六类解决方案，覆盖创意策划、数字内容、技术集成、工程实施和运维支持。"],
  ["如何启动一个数字光影项目？", "先提供项目场景、城市、空间面积、预算范围与计划时间。团队会依次进行需求澄清、创意方案、深化设计、制作实施和交付运营。"],
  ["可以只做内容制作或设备技术支持吗？", "可以。除整体解决方案外，也可以提供数字片源制作、设备租赁、系统调试、现场技术保障及后期内容更新。"],
  ["AI智能顾问会直接给出报价和工期吗？", "不会。AI顾问用于业务介绍、案例推荐和需求整理。价格、工期、配置与效果必须由人工项目顾问结合现场条件确认。"]
];
