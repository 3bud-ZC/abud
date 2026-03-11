const PptxGenJS = require("pptxgenjs");

// ─── Shared helpers ───────────────────────────────────────────────────────────
const COLORS = {
  primary: "1A3C6E",
  secondary: "2980B9",
  accent: "E67E22",
  light: "ECF0F1",
  white: "FFFFFF",
  dark: "1C1C1C",
  gray: "7F8C8D",
  green: "27AE60",
  purple: "8E44AD",
  teal: "16A085",
};

function newPres() {
  const prs = new PptxGenJS();
  prs.layout = "LAYOUT_WIDE";
  prs.rtlMode = true;
  return prs;
}

function addBg(slide, color = COLORS.white) {
  slide.addShape("rect", { x: 0, y: 0, w: "100%", h: "100%", fill: { color } });
}

function addHeader(slide, title, subtitle = "") {
  // top bar
  slide.addShape("rect", { x: 0, y: 0, w: "100%", h: 1.1, fill: { color: COLORS.primary } });
  slide.addText(title, {
    x: 0.3, y: 0.1, w: "95%", h: 0.85,
    fontSize: 26, bold: true, color: COLORS.white,
    align: "right", rtlMode: true,
    fontFace: "Arial",
  });
  if (subtitle) {
    slide.addShape("rect", { x: 0, y: 1.1, w: "100%", h: 0.35, fill: { color: COLORS.secondary } });
    slide.addText(subtitle, {
      x: 0.3, y: 1.1, w: "95%", h: 0.35,
      fontSize: 13, color: COLORS.white, align: "right", rtlMode: true, fontFace: "Arial",
    });
  }
}

function addFooter(slide, num) {
  slide.addShape("rect", { x: 0, y: 6.9, w: "100%", h: 0.35, fill: { color: COLORS.primary } });
  slide.addText(`${num}`, {
    x: 0, y: 6.9, w: "100%", h: 0.35,
    fontSize: 11, color: COLORS.white, align: "center", fontFace: "Arial",
  });
}

function bulletSlide(prs, title, subtitle, bullets, num, accent = COLORS.accent) {
  const slide = prs.addSlide();
  addBg(slide, COLORS.light);
  addHeader(slide, title, subtitle);
  const items = bullets.map((b) => ({
    text: b,
    options: { bullet: { type: "number" }, fontSize: 17, color: COLORS.dark, breakLine: true, rtlMode: true, align: "right" },
  }));
  slide.addText(items, {
    x: 0.4, y: 1.6, w: 9.2, h: 5.0,
    fontFace: "Arial", rtlMode: true,
  });
  // side accent bar
  slide.addShape("rect", { x: 9.7, y: 1.55, w: 0.18, h: 5.0, fill: { color: accent } });
  addFooter(slide, num);
  return slide;
}

function titleSlide(prs, title, subtitle, presenter, date) {
  const slide = prs.addSlide();
  // gradient-like bg
  slide.addShape("rect", { x: 0, y: 0, w: "100%", h: "100%", fill: { color: COLORS.primary } });
  slide.addShape("rect", { x: 0, y: 4.5, w: "100%", h: 2.75, fill: { color: COLORS.secondary } });
  // decorative circles
  slide.addShape("ellipse", { x: -0.8, y: -0.8, w: 2.5, h: 2.5, fill: { color: "FFFFFF", transparency: 85 } });
  slide.addShape("ellipse", { x: 8.5, y: 5.5, w: 3, h: 3, fill: { color: "FFFFFF", transparency: 85 } });
  slide.addShape("ellipse", { x: 7.5, y: 0.2, w: 1.5, h: 1.5, fill: { color: COLORS.accent, transparency: 60 } });
  // title
  slide.addText(title, {
    x: 0.5, y: 1.2, w: 9, h: 1.4,
    fontSize: 36, bold: true, color: COLORS.white, align: "center", rtlMode: true, fontFace: "Arial",
  });
  // divider
  slide.addShape("rect", { x: 3, y: 2.8, w: 4, h: 0.07, fill: { color: COLORS.accent } });
  // subtitle
  slide.addText(subtitle, {
    x: 0.5, y: 3.0, w: 9, h: 0.9,
    fontSize: 20, color: "D6EAF8", align: "center", rtlMode: true, fontFace: "Arial",
  });
  slide.addText(presenter, {
    x: 0.5, y: 4.6, w: 9, h: 0.5,
    fontSize: 15, color: COLORS.white, align: "center", fontFace: "Arial",
  });
  slide.addText(date, {
    x: 0.5, y: 5.1, w: 9, h: 0.4,
    fontSize: 13, color: "BDC3C7", align: "center", fontFace: "Arial",
  });
  return slide;
}

function conclusionSlide(prs, points, num) {
  const slide = prs.addSlide();
  slide.addShape("rect", { x: 0, y: 0, w: "100%", h: "100%", fill: { color: COLORS.primary } });
  slide.addShape("rect", { x: 0, y: 5.8, w: "100%", h: 1.45, fill: { color: COLORS.secondary } });
  slide.addShape("ellipse", { x: -1, y: -1, w: 3, h: 3, fill: { color: "FFFFFF", transparency: 88 } });
  slide.addShape("ellipse", { x: 8, y: 5, w: 2.5, h: 2.5, fill: { color: COLORS.accent, transparency: 70 } });
  slide.addText("الخلاصة", {
    x: 0.5, y: 0.3, w: 9, h: 0.9,
    fontSize: 34, bold: true, color: COLORS.white, align: "center", rtlMode: true, fontFace: "Arial",
  });
  slide.addShape("rect", { x: 3.5, y: 1.25, w: 3, h: 0.06, fill: { color: COLORS.accent } });
  const items = points.map((p) => ({
    text: "✔  " + p,
    options: { fontSize: 16, color: COLORS.white, breakLine: true, rtlMode: true, align: "right" },
  }));
  slide.addText(items, {
    x: 0.5, y: 1.5, w: 9, h: 4.1,
    fontFace: "Arial", rtlMode: true,
  });
  addFooter(slide, num);
  return slide;
}

// ─── Box-grid helper (icon-style cards) ─────────────────────────────────────
function boxGrid(slide, items, startY = 1.6) {
  // items: [{label, color}]  max 4
  const cols = Math.min(items.length, 4);
  const w = 9.6 / cols;
  items.forEach((item, i) => {
    const x = 0.2 + i * w;
    slide.addShape("rect", {
      x, y: startY, w: w - 0.15, h: 1.4,
      fill: { color: item.color || COLORS.secondary },
      line: { color: COLORS.white, width: 1 },
      rectRadius: 0.1,
    });
    slide.addText(item.label, {
      x, y: startY, w: w - 0.15, h: 1.4,
      fontSize: 14, color: COLORS.white, bold: true, align: "center", valign: "middle",
      rtlMode: true, fontFace: "Arial",
    });
  });
}

// ─── Arrow process flow ───────────────────────────────────────────────────────
function processFlow(slide, steps, y = 3.3, colors) {
  const n = steps.length;
  const bw = 9.4 / n;
  steps.forEach((s, i) => {
    const x = 0.2 + i * bw;
    const c = colors ? colors[i % colors.length] : COLORS.secondary;
    slide.addShape("rect", {
      x, y, w: bw - 0.25, h: 0.85,
      fill: { color: c }, rectRadius: 0.08,
    });
    slide.addText(s, {
      x, y, w: bw - 0.25, h: 0.85,
      fontSize: 12, color: COLORS.white, bold: true,
      align: "center", valign: "middle", rtlMode: true, fontFace: "Arial",
    });
    if (i < n - 1) {
      slide.addShape("triangle", {
        x: x + bw - 0.28, y: y + 0.2, w: 0.22, h: 0.45,
        fill: { color: COLORS.accent },
        rotate: 90,
      });
    }
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRESENTATION 1 – مقدمة عن نظم المعلومات
// ═══════════════════════════════════════════════════════════════════════════════
function createPres01() {
  const prs = newPres();

  // Slide 1 – Title
  titleSlide(prs, "مقدمة عن نظم المعلومات", "Introduction to Information Systems", "جامعة | كلية تقنية المعلومات", "2025 / 2026");

  // Slide 2 – Agenda
  const s2 = prs.addSlide();
  addBg(s2, COLORS.light);
  addHeader(s2, "محتوى العرض", "Agenda");
  const agenda = ["تعريف نظم المعلومات", "مكونات نظم المعلومات", "أهمية نظم المعلومات", "أمثلة عملية", "دور نظم المعلومات في المؤسسات", "الخلاصة"];
  agenda.forEach((item, i) => {
    const colors2 = [COLORS.primary, COLORS.secondary, COLORS.accent, COLORS.teal, COLORS.purple, COLORS.green];
    s2.addShape("rect", { x: 0.3, y: 1.65 + i * 0.8, w: 0.55, h: 0.55, fill: { color: colors2[i] }, rectRadius: 0.05 });
    s2.addText(`${i + 1}`, { x: 0.3, y: 1.65 + i * 0.8, w: 0.55, h: 0.55, fontSize: 16, color: COLORS.white, bold: true, align: "center", valign: "middle", fontFace: "Arial" });
    s2.addText(item, { x: 1.0, y: 1.65 + i * 0.8, w: 8.5, h: 0.55, fontSize: 17, color: COLORS.dark, align: "right", rtlMode: true, valign: "middle", fontFace: "Arial" });
  });
  addFooter(s2, 2);

  // Slide 3 – Definition
  bulletSlide(prs, "تعريف نظم المعلومات", "What is an Information System?", [
    "نظام المعلومات هو مجموعة متكاملة من المكونات لجمع البيانات ومعالجتها وتخزينها وتوزيعها",
    "يدعم صنع القرار والتنسيق والرقابة داخل المنظمة",
    "يربط بين التكنولوجيا والناس والعمليات لتحقيق أهداف المنظمة",
    "يحول البيانات الخام إلى معلومات ذات قيمة وقابلة للاستخدام",
    "يُعدّ ركيزةً أساسية في المؤسسات الحديثة",
  ], 3);

  // Slide 4 – Components diagram
  const s4 = prs.addSlide();
  addBg(s4, COLORS.light);
  addHeader(s4, "مكونات نظم المعلومات", "IS Components");
  const comps = [
    { label: "الأجهزة\nHardware", color: COLORS.primary },
    { label: "البرمجيات\nSoftware", color: COLORS.secondary },
    { label: "البيانات\nData", color: COLORS.teal },
    { label: "الناس\nPeople", color: COLORS.accent },
    { label: "الإجراءات\nProcedures", color: COLORS.purple },
  ];
  const cw = 9.4 / comps.length;
  comps.forEach((c, i) => {
    const x = 0.2 + i * cw;
    s4.addShape("rect", { x, y: 1.7, w: cw - 0.15, h: 2.2, fill: { color: c.color }, rectRadius: 0.1 });
    s4.addText(c.label, { x, y: 1.7, w: cw - 0.15, h: 2.2, fontSize: 14, color: COLORS.white, bold: true, align: "center", valign: "middle", rtlMode: true, fontFace: "Arial" });
  });
  // central arrow
  s4.addShape("rect", { x: 0.2, y: 4.2, w: 9.55, h: 0.08, fill: { color: COLORS.accent } });
  s4.addText("نظام المعلومات = تكامل جميع المكونات لتحقيق الهدف المؤسسي", {
    x: 0.3, y: 4.4, w: 9.3, h: 0.6,
    fontSize: 15, color: COLORS.primary, bold: true, align: "center", rtlMode: true, fontFace: "Arial",
  });
  // input → process → output
  processFlow(s4, ["المدخلات\nInput", "المعالجة\nProcess", "المخرجات\nOutput", "التغذية الراجعة\nFeedback"],
    5.2, [COLORS.teal, COLORS.primary, COLORS.secondary, COLORS.accent]);
  addFooter(s4, 4);

  // Slide 5 – Importance
  bulletSlide(prs, "أهمية نظم المعلومات", "Why IS Matters?", [
    "تحسين الكفاءة التشغيلية وتقليل التكاليف",
    "دعم اتخاذ القرارات الاستراتيجية بالبيانات الدقيقة",
    "تعزيز التواصل والتعاون بين الأقسام",
    "تحقيق الميزة التنافسية في السوق",
    "توفير معلومات آنية لدعم الإدارة",
    "تحسين خدمة العملاء والاستجابة لمتطلباتهم",
  ], 5, COLORS.green);

  // Slide 6 – Examples daily life
  const s6 = prs.addSlide();
  addBg(s6, COLORS.light);
  addHeader(s6, "أمثلة على نظم المعلومات في الحياة اليومية", "Real-World Examples");
  const examples = [
    { label: "الصراف الآلي\nATM", color: COLORS.primary },
    { label: "التسوق الإلكتروني\nE-Commerce", color: COLORS.secondary },
    { label: "أنظمة المستشفيات\nHospital IS", color: COLORS.teal },
    { label: "إدارة المدارس\nSchool IS", color: COLORS.accent },
  ];
  boxGrid(s6, examples, 1.65);
  const examples2 = [
    { label: "نظام الجرد\nInventory IS", color: COLORS.purple },
    { label: "أنظمة الطيران\nAirlines IS", color: COLORS.green },
    { label: "البنوك الرقمية\nDigital Banking", color: COLORS.gray },
    { label: "الحكومة الإلكترونية\ne-Government", color: COLORS.primary },
  ];
  boxGrid(s6, examples2, 3.25);
  addFooter(s6, 6);

  // Slide 7 – Role in organizations
  bulletSlide(prs, "دور نظم المعلومات في المؤسسات", "Role in Organizations", [
    "أتمتة العمليات التشغيلية اليومية وتقليل الأخطاء البشرية",
    "توفير تقارير إدارية دقيقة وفي الوقت المناسب",
    "ربط الإدارات المختلفة في نظام متكامل",
    "تحسين عمليات التخطيط والرقابة والتقييم",
    "دعم الابتكار وتطوير منتجات وخدمات جديدة",
  ], 7, COLORS.teal);

  // Slide 8 – IS Types overview
  const s8 = prs.addSlide();
  addBg(s8, COLORS.light);
  addHeader(s8, "تصنيف نظم المعلومات حسب المستوى الإداري", "IS by Management Level");
  const levels = [
    { label: "المستوى الاستراتيجي\nExecutive IS", y: 1.7, color: COLORS.purple, x: 3.5, w: 3 },
    { label: "المستوى التكتيكي\nDecision Support IS", y: 2.85, color: COLORS.secondary, x: 2.5, w: 5 },
    { label: "المستوى التشغيلي\nTransaction Processing IS", y: 4.0, color: COLORS.teal, x: 1.0, w: 8 },
  ];
  levels.forEach((l) => {
    s8.addShape("rect", { x: l.x, y: l.y, w: l.w, h: 0.85, fill: { color: l.color }, rectRadius: 0.08 });
    s8.addText(l.label, { x: l.x, y: l.y, w: l.w, h: 0.85, fontSize: 13, color: COLORS.white, bold: true, align: "center", valign: "middle", rtlMode: true, fontFace: "Arial" });
  });
  s8.addText("المستويات الإدارية لنظم المعلومات (هرمي)", {
    x: 0.3, y: 5.2, w: 9.3, h: 0.5,
    fontSize: 14, color: COLORS.primary, bold: true, align: "center", rtlMode: true, fontFace: "Arial",
  });
  addFooter(s8, 8);

  // Slide 9 – Challenges
  bulletSlide(prs, "تحديات نظم المعلومات", "IS Challenges", [
    "أمن المعلومات والحماية من الاختراق الإلكتروني",
    "إدارة التغيير والمقاومة من قِبل المستخدمين",
    "التكاليف العالية للتطوير والصيانة",
    "التوافق مع اللوائح والأنظمة القانونية",
    "التحديث المستمر لمواكبة التطور التكنولوجي",
  ], 9, COLORS.purple);

  // Slide 10 – Future
  bulletSlide(prs, "مستقبل نظم المعلومات", "Future Trends", [
    "الذكاء الاصطناعي وتعلم الآلة في معالجة البيانات",
    "الحوسبة السحابية وخدمات SaaS",
    "إنترنت الأشياء (IoT) وربط الأجهزة الذكية",
    "تحليلات البيانات الضخمة (Big Data Analytics)",
    "الأمن السيبراني كأولوية استراتيجية",
  ], 10, COLORS.accent);

  // Slide 11 – Conclusion
  conclusionSlide(prs, [
    "نظم المعلومات هي العمود الفقري للمؤسسات الحديثة",
    "تتكون من خمسة مكونات رئيسية متكاملة",
    "تدعم جميع المستويات الإدارية في صنع القرار",
    "تُشكّل أمثلة واسعة في حياتنا اليومية",
    "مستقبلها مرتبط بالذكاء الاصطناعي والبيانات الضخمة",
  ], 11);

  prs.writeFile({ fileName: "Presentation_01.pptx" });
  console.log("✅  Presentation_01.pptx created");
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRESENTATION 2 – SDLC
// ═══════════════════════════════════════════════════════════════════════════════
function createPres02() {
  const prs = newPres();

  titleSlide(prs, "مراحل دورة حياة تطوير نظم المعلومات", "System Development Life Cycle (SDLC)", "جامعة | كلية هندسة البرمجيات", "2025 / 2026");

  // Agenda
  const s2 = prs.addSlide();
  addBg(s2, COLORS.light);
  addHeader(s2, "محتوى العرض", "Agenda");
  ["تعريف SDLC", "أهمية SDLC", "مرحلة التخطيط", "مرحلة التحليل", "مرحلة التصميم", "مرحلة التطبيق", "مرحلة الصيانة", "الخلاصة"].forEach((item, i) => {
    const colors3 = [COLORS.primary, COLORS.secondary, COLORS.teal, COLORS.accent, COLORS.purple, COLORS.green, COLORS.gray, COLORS.primary];
    s2.addShape("rect", { x: 0.3, y: 1.55 + i * 0.65, w: 0.5, h: 0.5, fill: { color: colors3[i] }, rectRadius: 0.05 });
    s2.addText(`${i + 1}`, { x: 0.3, y: 1.55 + i * 0.65, w: 0.5, h: 0.5, fontSize: 14, color: COLORS.white, bold: true, align: "center", valign: "middle", fontFace: "Arial" });
    s2.addText(item, { x: 1.0, y: 1.55 + i * 0.65, w: 8.5, h: 0.5, fontSize: 16, color: COLORS.dark, align: "right", rtlMode: true, valign: "middle", fontFace: "Arial" });
  });
  addFooter(s2, 2);

  // Slide 3 – Definition
  bulletSlide(prs, "تعريف دورة حياة تطوير الأنظمة", "What is SDLC?", [
    "SDLC هو إطار عمل منهجي لتخطيط وتصميم وتطوير نظم المعلومات",
    "يوفر هيكلاً منظماً لإدارة مشاريع تطوير البرمجيات",
    "يضمن جودة المنتج النهائي وتوافقه مع متطلبات المستخدمين",
    "يُحدد الأدوار والمسؤوليات لكل مرحلة من مراحل التطوير",
    "يُساعد على تقليل المخاطر وضبط الميزانية والجداول الزمنية",
  ], 3);

  // Slide 4 – Importance
  bulletSlide(prs, "أهمية SDLC", "Why SDLC?", [
    "يضمن تلبية متطلبات المستخدمين النهائيين بدقة",
    "يُقلل من تكاليف التطوير عبر التخطيط المسبق الجيد",
    "يُحسّن التواصل بين فريق التطوير والعملاء",
    "يوفر توثيقاً شاملاً في كل مرحلة من المراحل",
    "يُسهل عملية الصيانة والتطوير المستقبلي للنظام",
    "يُقلل من احتمالية الفشل في المشاريع البرمجية",
  ], 4, COLORS.green);

  // Slide 5 – SDLC Process Flow
  const s5 = prs.addSlide();
  addBg(s5, COLORS.light);
  addHeader(s5, "مراحل دورة حياة تطوير الأنظمة", "SDLC Phases Overview");
  const phases = ["1\nتخطيط\nPlanning", "2\nتحليل\nAnalysis", "3\nتصميم\nDesign", "4\nتطبيق\nImplementation", "5\nصيانة\nMaintenance"];
  const phColors = [COLORS.primary, COLORS.teal, COLORS.secondary, COLORS.accent, COLORS.purple];
  phases.forEach((p, i) => {
    const x = 0.3 + i * 1.9;
    s5.addShape("rect", { x, y: 1.8, w: 1.7, h: 2.5, fill: { color: phColors[i] }, rectRadius: 0.12 });
    s5.addText(p, { x, y: 1.8, w: 1.7, h: 2.5, fontSize: 13, color: COLORS.white, bold: true, align: "center", valign: "middle", rtlMode: true, fontFace: "Arial" });
    if (i < 4) {
      s5.addShape("triangle", { x: x + 1.75, y: 2.85, w: 0.18, h: 0.4, fill: { color: COLORS.accent }, rotate: 90 });
    }
  });
  // cycle indicator
  s5.addShape("rect", { x: 0.3, y: 4.55, w: 9.35, h: 0.06, fill: { color: COLORS.accent } });
  s5.addText("دورة مستمرة ومتكررة – Iterative & Continuous Cycle", {
    x: 0.3, y: 4.7, w: 9.3, h: 0.5,
    fontSize: 14, color: COLORS.primary, bold: true, align: "center", rtlMode: true, fontFace: "Arial",
  });
  // phase descriptions
  processFlow(s5, ["تحديد الأهداف", "جمع المتطلبات", "النمذجة", "البرمجة والاختبار", "الدعم والتحسين"], 5.4, phColors);
  addFooter(s5, 5);

  // Slides 6–10 one per phase
  const phaseData = [
    { title: "مرحلة التخطيط", sub: "Phase 1: Planning", bullets: ["تحديد نطاق المشروع وأهدافه الرئيسية", "دراسة الجدوى (تقنية / اقتصادية / تشغيلية)", "تحديد الموارد البشرية والمادية المطلوبة", "وضع الجدول الزمني والميزانية التقديرية", "تحديد المخاطر المحتملة ووضع خطط للتعامل معها"], accent: COLORS.primary },
    { title: "مرحلة التحليل", sub: "Phase 2: Analysis", bullets: ["جمع متطلبات المستخدمين من خلال المقابلات والاستبيانات", "تحليل النظام الحالي وتحديد نقاط الضعف", "توثيق متطلبات النظام الجديد بدقة", "إعداد مخططات تدفق البيانات (DFD)", "مراجعة المتطلبات مع أصحاب المصلحة وإقرارها"], accent: COLORS.teal },
    { title: "مرحلة التصميم", sub: "Phase 3: Design", bullets: ["تصميم بنية النظام والمكونات الرئيسية", "تصميم قاعدة البيانات والجداول والعلاقات", "تصميم واجهة المستخدم (UI/UX)", "تصميم منطق البرنامج وخوارزمياته", "مراجعة التصميم والتأكد من توافقه مع المتطلبات"], accent: COLORS.secondary },
    { title: "مرحلة التطبيق والاختبار", sub: "Phase 4: Implementation", bullets: ["كتابة كود البرنامج وفق معايير الجودة", "إجراء اختبارات الوحدة واختبارات التكامل", "اختبار قبول المستخدم (UAT)", "نشر النظام وتدريب المستخدمين", "توثيق النظام وإعداد دليل المستخدم"], accent: COLORS.accent },
    { title: "مرحلة الصيانة", sub: "Phase 5: Maintenance", bullets: ["إصلاح الأخطاء والمشكلات التقنية بعد الإطلاق", "إضافة ميزات جديدة بناءً على تغذية المستخدمين", "تحديث النظام لمواكبة التغيرات البيئية", "مراقبة أداء النظام وتحسينه باستمرار", "إجراء نسخ احتياطية ومراجعات أمنية دورية"], accent: COLORS.purple },
  ];
  phaseData.forEach((ph, i) => {
    bulletSlide(prs, ph.title, ph.sub, ph.bullets, i + 6, ph.accent);
  });

  // Conclusion
  conclusionSlide(prs, [
    "SDLC يوفر إطاراً منهجياً لتطوير الأنظمة بنجاح",
    "يمر بخمس مراحل متتابعة: تخطيط، تحليل، تصميم، تطبيق، صيانة",
    "يضمن جودة المنتج وتلبية متطلبات المستخدمين",
    "يُقلل من المخاطر ويضبط التكاليف والجداول الزمنية",
    "يُعد أساساً لجميع منهجيات تطوير البرمجيات الحديثة",
  ], 11);

  prs.writeFile({ fileName: "Presentation_02.pptx" });
  console.log("✅  Presentation_02.pptx created");
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRESENTATION 3 – Agile
// ═══════════════════════════════════════════════════════════════════════════════
function createPres03() {
  const prs = newPres();

  titleSlide(prs, "منهجيات التطوير الرشيقة", "Agile Development Methodologies", "جامعة | كلية هندسة البرمجيات", "2025 / 2026");

  // Agenda
  const s2 = prs.addSlide();
  addBg(s2, COLORS.light);
  addHeader(s2, "محتوى العرض", "Agenda");
  ["تعريف Agile", "Agile vs Waterfall", "مبادئ Agile الإثنا عشر", "مفهوم Sprint", "منهجية Scrum", "منهجية Kanban", "منهجية XP", "الخلاصة"].forEach((item, i) => {
    const c = [COLORS.primary, COLORS.secondary, COLORS.teal, COLORS.accent, COLORS.purple, COLORS.green, COLORS.gray, COLORS.primary][i];
    s2.addShape("rect", { x: 0.3, y: 1.55 + i * 0.65, w: 0.5, h: 0.5, fill: { color: c }, rectRadius: 0.05 });
    s2.addText(`${i + 1}`, { x: 0.3, y: 1.55 + i * 0.65, w: 0.5, h: 0.5, fontSize: 14, color: COLORS.white, bold: true, align: "center", valign: "middle", fontFace: "Arial" });
    s2.addText(item, { x: 1.0, y: 1.55 + i * 0.65, w: 8.5, h: 0.5, fontSize: 16, color: COLORS.dark, align: "right", rtlMode: true, valign: "middle", fontFace: "Arial" });
  });
  addFooter(s2, 2);

  // Slide 3 – What is Agile
  bulletSlide(prs, "تعريف التطوير الرشيق", "What is Agile?", [
    "Agile هو إطار عمل مرن لتطوير البرمجيات يُركز على التكرار والتعاون",
    "يُقسّم المشروع إلى دورات قصيرة تُسمى Sprints (عادةً 2–4 أسابيع)",
    "يُشجع على التكيف السريع مع التغييرات في المتطلبات",
    "يُولي الأولوية للتعاون مع العميل على التعاقد الرسمي",
    "صدر عام 2001 ضمن البيان الرشيق الشهير (Agile Manifesto)",
  ], 3);

  // Slide 4 – Agile vs Waterfall comparison
  const s4 = prs.addSlide();
  addBg(s4, COLORS.light);
  addHeader(s4, "Agile مقابل Waterfall", "Agile vs Waterfall Comparison");
  const headers = ["المعيار", "Waterfall", "Agile"];
  const rows = [
    ["المرونة", "محدودة – صعوبة التغيير", "عالية – التغيير مرحّب به"],
    ["التسليم", "في نهاية المشروع", "تسليمات دورية متكررة"],
    ["مشاركة العميل", "في البداية والنهاية فقط", "مستمرة طوال المشروع"],
    ["التوثيق", "ثقيل ومفصّل", "خفيف وكافٍ للعمل"],
    ["الاختبار", "بعد التطوير الكامل", "متكامل في كل Sprint"],
    ["المناسب لـ", "متطلبات ثابتة ومحددة", "متطلبات متغيرة وغير محددة"],
  ];
  const tw = 9.4 / 3;
  headers.forEach((h, i) => {
    s4.addShape("rect", { x: 0.2 + i * tw, y: 1.65, w: tw - 0.05, h: 0.5, fill: { color: COLORS.primary } });
    s4.addText(h, { x: 0.2 + i * tw, y: 1.65, w: tw - 0.05, h: 0.5, fontSize: 14, color: COLORS.white, bold: true, align: "center", valign: "middle", rtlMode: true, fontFace: "Arial" });
  });
  rows.forEach((row, ri) => {
    const bg = ri % 2 === 0 ? "FDFEFE" : "EBF5FB";
    row.forEach((cell, ci) => {
      s4.addShape("rect", { x: 0.2 + ci * tw, y: 2.2 + ri * 0.72, w: tw - 0.05, h: 0.68, fill: { color: bg }, line: { color: "D6DBDF", width: 0.5 } });
      s4.addText(cell, { x: 0.2 + ci * tw, y: 2.2 + ri * 0.72, w: tw - 0.05, h: 0.68, fontSize: 12, color: COLORS.dark, align: "center", valign: "middle", rtlMode: true, fontFace: "Arial" });
    });
  });
  addFooter(s4, 4);

  // Slide 5 – Agile Principles
  bulletSlide(prs, "مبادئ Agile الرئيسية", "Core Agile Principles", [
    "تقديم البرنامج العامل بصفة منتظمة ومتكررة",
    "الترحيب بتغيير المتطلبات حتى في المراحل المتأخرة",
    "التعاون اليومي بين فريق العمل وأصحاب الأعمال",
    "بناء المشاريع حول أفراد محفّزين وإعطائهم الثقة",
    "التواصل وجهاً لوجه هو الأكثر فاعلية",
    "التحسين المستمر من خلال جلسات الاستعراض والمراجعة",
    "البساطة في التصميم والتطوير هي الجوهر",
  ], 5, COLORS.teal);

  // Slide 6 – Sprint concept
  const s6 = prs.addSlide();
  addBg(s6, COLORS.light);
  addHeader(s6, "مفهوم Sprint في التطوير الرشيق", "Sprint Concept");
  processFlow(s6, ["Product\nBacklog", "Sprint\nPlanning", "Sprint\n(2-4 أسابيع)", "Sprint\nReview", "Sprint\nRetrospective"], 2.0,
    [COLORS.primary, COLORS.secondary, COLORS.teal, COLORS.accent, COLORS.purple]);
  const sprintInfo = ["Sprint هو دورة تطوير قصيرة من 1–4 أسابيع", "ينتهي كل Sprint بتسليم جزء قابل للاستخدام", "يتضمن اجتماع تخطيط، واجتماع يومي (Daily Scrum)، واجتماع مراجعة"];
  sprintInfo.forEach((t, i) => {
    s6.addShape("rect", { x: 0.3, y: 3.5 + i * 0.85, w: 0.15, h: 0.65, fill: { color: COLORS.accent } });
    s6.addText(t, { x: 0.6, y: 3.5 + i * 0.85, w: 9, h: 0.65, fontSize: 15, color: COLORS.dark, align: "right", rtlMode: true, valign: "middle", fontFace: "Arial" });
  });
  addFooter(s6, 6);

  // Slide 7 – Scrum
  const s7 = prs.addSlide();
  addBg(s7, COLORS.light);
  addHeader(s7, "منهجية Scrum", "Scrum Framework");
  const roles = [
    { label: "Product Owner\nمالك المنتج", color: COLORS.primary },
    { label: "Scrum Master\nمدير Scrum", color: COLORS.secondary },
    { label: "Dev Team\nفريق التطوير", color: COLORS.teal },
  ];
  boxGrid(s7, roles, 1.7);
  const events = [
    { label: "Sprint Planning\nتخطيط Sprint", color: COLORS.accent },
    { label: "Daily Scrum\nالاجتماع اليومي", color: COLORS.purple },
    { label: "Sprint Review\nمراجعة Sprint", color: COLORS.green },
    { label: "Retrospective\nتقييم المرحلة", color: COLORS.gray },
  ];
  boxGrid(s7, events, 3.3);
  s7.addText("Scrum Artifacts: Product Backlog | Sprint Backlog | Increment", {
    x: 0.3, y: 5.0, w: 9.3, h: 0.55,
    fontSize: 13, color: COLORS.primary, bold: true, align: "center", fontFace: "Arial",
  });
  addFooter(s7, 7);

  // Slide 8 – Kanban
  const s8 = prs.addSlide();
  addBg(s8, COLORS.light);
  addHeader(s8, "منهجية Kanban", "Kanban Board");
  const kanbanCols = ["To Do\nللتنفيذ", "In Progress\nقيد التنفيذ", "Review\nمراجعة", "Done\nمكتمل"];
  const kanbanColors = [COLORS.gray, COLORS.secondary, COLORS.accent, COLORS.green];
  kanbanCols.forEach((col, i) => {
    const x = 0.2 + i * 2.4;
    s8.addShape("rect", { x, y: 1.65, w: 2.25, h: 0.6, fill: { color: kanbanColors[i] }, rectRadius: 0.08 });
    s8.addText(col, { x, y: 1.65, w: 2.25, h: 0.6, fontSize: 13, color: COLORS.white, bold: true, align: "center", valign: "middle", rtlMode: true, fontFace: "Arial" });
    // sample cards
    ["مهمة أ", "مهمة ب"].forEach((task, j) => {
      s8.addShape("rect", { x: x + 0.08, y: 2.4 + j * 1.1, w: 2.1, h: 0.9, fill: { color: COLORS.white }, line: { color: kanbanColors[i], width: 1 }, rectRadius: 0.06 });
      s8.addText(task, { x: x + 0.08, y: 2.4 + j * 1.1, w: 2.1, h: 0.9, fontSize: 13, color: COLORS.dark, align: "center", valign: "middle", rtlMode: true, fontFace: "Arial" });
    });
  });
  s8.addText("Kanban: نظام بصري لإدارة سير العمل وتحديد الأولويات", {
    x: 0.3, y: 5.6, w: 9.3, h: 0.5,
    fontSize: 13, color: COLORS.primary, bold: true, align: "center", rtlMode: true, fontFace: "Arial",
  });
  addFooter(s8, 8);

  // Slide 9 – XP
  bulletSlide(prs, "البرمجة المتطرفة (Extreme Programming)", "XP – Extreme Programming", [
    "تُركز على التغذية الراجعة السريعة والتحسين المستمر",
    "Pair Programming: برمجة ثنائية لتحسين الجودة",
    "Test-Driven Development (TDD): كتابة الاختبار قبل الكود",
    "Continuous Integration: دمج الكود بصفة مستمرة",
    "Refactoring: إعادة هيكلة الكود لتحسين الجودة",
    "مناسبة للمشاريع ذات المتطلبات المتغيرة باستمرار",
  ], 9, COLORS.purple);

  // Slide 10 – Comparison Agile frameworks
  const s10 = prs.addSlide();
  addBg(s10, COLORS.light);
  addHeader(s10, "مقارنة بين منهجيات Agile", "Agile Frameworks Comparison");
  const fwHeaders = ["المنهجية", "التركيز", "الهيكل", "المناسب لـ"];
  const fwRows = [
    ["Scrum", "Sprint + أدوار", "واضح ومنظم", "فرق متوسطة"],
    ["Kanban", "تدفق العمل البصري", "مرن جداً", "الدعم والصيانة"],
    ["XP", "جودة الكود", "صارم تقنياً", "مشاريع تقنية معقدة"],
  ];
  const fw = 9.4 / 4;
  fwHeaders.forEach((h, i) => {
    s10.addShape("rect", { x: 0.2 + i * fw, y: 1.65, w: fw - 0.05, h: 0.5, fill: { color: COLORS.primary } });
    s10.addText(h, { x: 0.2 + i * fw, y: 1.65, w: fw - 0.05, h: 0.5, fontSize: 13, color: COLORS.white, bold: true, align: "center", valign: "middle", rtlMode: true, fontFace: "Arial" });
  });
  fwRows.forEach((row, ri) => {
    const bg = ri % 2 === 0 ? "FDFEFE" : "EBF5FB";
    row.forEach((cell, ci) => {
      s10.addShape("rect", { x: 0.2 + ci * fw, y: 2.2 + ri * 0.85, w: fw - 0.05, h: 0.8, fill: { color: bg }, line: { color: "D6DBDF", width: 0.5 } });
      s10.addText(cell, { x: 0.2 + ci * fw, y: 2.2 + ri * 0.85, w: fw - 0.05, h: 0.8, fontSize: 13, color: COLORS.dark, align: "center", valign: "middle", rtlMode: true, fontFace: "Arial" });
    });
  });
  addFooter(s10, 10);

  // Conclusion
  conclusionSlide(prs, [
    "Agile يُعزز المرونة والتكيف في تطوير البرمجيات",
    "Sprint هو قلب عمليات التطوير الرشيق",
    "Scrum يُوفر هيكلاً واضحاً بأدوار وأحداث محددة",
    "Kanban يُبسّط إدارة سير العمل بصرياً",
    "XP يُركز على جودة الكود والاختبار المستمر",
  ], 11);

  prs.writeFile({ fileName: "Presentation_03.pptx" });
  console.log("✅  Presentation_03.pptx created");
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRESENTATION 4 – Planning Phase
// ═══════════════════════════════════════════════════════════════════════════════
function createPres04() {
  const prs = newPres();

  titleSlide(prs, "الخطوات الرئيسية في مرحلة التخطيط", "Planning Phase in Systems Development", "جامعة | كلية إدارة المعلومات", "2025 / 2026");

  // Agenda
  const s2 = prs.addSlide();
  addBg(s2, COLORS.light);
  addHeader(s2, "محتوى العرض", "Agenda");
  ["تعريف مرحلة التخطيط", "تحديد المشكلة", "تحديد أهداف المشروع", "دراسة الجدوى", "الجدوى التقنية", "الجدوى الاقتصادية", "الجدوى التشغيلية", "تحديد الموارد والجدول الزمني", "الخلاصة"].forEach((item, i) => {
    const c = [COLORS.primary, COLORS.secondary, COLORS.teal, COLORS.accent, COLORS.purple, COLORS.green, COLORS.gray, COLORS.teal, COLORS.primary][i];
    s2.addShape("rect", { x: 0.3, y: 1.4 + i * 0.6, w: 0.48, h: 0.48, fill: { color: c }, rectRadius: 0.05 });
    s2.addText(`${i + 1}`, { x: 0.3, y: 1.4 + i * 0.6, w: 0.48, h: 0.48, fontSize: 13, color: COLORS.white, bold: true, align: "center", valign: "middle", fontFace: "Arial" });
    s2.addText(item, { x: 1.0, y: 1.4 + i * 0.6, w: 8.5, h: 0.48, fontSize: 15, color: COLORS.dark, align: "right", rtlMode: true, valign: "middle", fontFace: "Arial" });
  });
  addFooter(s2, 2);

  bulletSlide(prs, "تعريف مرحلة التخطيط", "What is Planning Phase?", [
    "أولى مراحل دورة حياة تطوير الأنظمة وأكثرها أهمية",
    "تُحدد ما إذا كان المشروع يستحق المتابعة من عدمه",
    "تضع الأساس الصحيح لجميع المراحل اللاحقة",
    "تُعرّف نطاق المشروع وحدوده ومخرجاته المتوقعة",
    "تشمل تحديد الجهات المعنية وأصحاب المصلحة الرئيسيين",
  ], 3);

  bulletSlide(prs, "تحديد المشكلة", "Problem Identification", [
    "وصف المشكلة الحالية بوضوح ودقة",
    "تحليل السبب الجذري للمشكلة باستخدام أدوات مثل Ishikawa",
    "تحديد الأطراف المتأثرة بالمشكلة وحجم التأثير",
    "توثيق المشكلة وتحديد أولوية حلها",
    "الحصول على موافقة الإدارة العليا على المضي قدماً",
  ], 4, COLORS.secondary);

  bulletSlide(prs, "تحديد أهداف المشروع", "Project Objectives", [
    "صياغة أهداف ذكية SMART (محددة، قابلة للقياس، قابلة للتحقق، ذات صلة، محددة زمنياً)",
    "الأهداف قصيرة المدى: تحسين العمليات خلال 3–6 أشهر",
    "الأهداف بعيدة المدى: تحقيق الكفاءة الاستراتيجية خلال سنة",
    "ربط الأهداف باحتياجات المنظمة وأهدافها الاستراتيجية",
    "توثيق الأهداف والموافقة عليها من قِبل جميع الأطراف",
  ], 5, COLORS.teal);

  // Slide 6 – Feasibility overview
  const s6 = prs.addSlide();
  addBg(s6, COLORS.light);
  addHeader(s6, "دراسة الجدوى", "Feasibility Study Overview");
  s6.addText("دراسة الجدوى: تُحدد إمكانية تنفيذ المشروع من ثلاثة محاور رئيسية", {
    x: 0.3, y: 1.55, w: 9.3, h: 0.55,
    fontSize: 15, color: COLORS.primary, bold: true, align: "center", rtlMode: true, fontFace: "Arial",
  });
  const feasTypes = [
    { label: "الجدوى التقنية\nTechnical Feasibility", color: COLORS.secondary, x: 0.3 },
    { label: "الجدوى الاقتصادية\nEconomic Feasibility", color: COLORS.accent, x: 3.5 },
    { label: "الجدوى التشغيلية\nOperational Feasibility", color: COLORS.teal, x: 6.7 },
  ];
  feasTypes.forEach((f) => {
    s6.addShape("rect", { x: f.x, y: 2.3, w: 3.0, h: 2.5, fill: { color: f.color }, rectRadius: 0.12 });
    s6.addText(f.label, { x: f.x, y: 2.3, w: 3.0, h: 2.5, fontSize: 14, color: COLORS.white, bold: true, align: "center", valign: "middle", rtlMode: true, fontFace: "Arial" });
  });
  s6.addShape("rect", { x: 0.3, y: 5.05, w: 9.35, h: 0.08, fill: { color: COLORS.accent } });
  s6.addText("النتيجة: قرار مبني على البيانات بالمضي قُدُماً أو إيقاف المشروع", {
    x: 0.3, y: 5.2, w: 9.3, h: 0.5,
    fontSize: 13, color: COLORS.dark, bold: true, align: "center", rtlMode: true, fontFace: "Arial",
  });
  addFooter(s6, 6);

  bulletSlide(prs, "الجدوى التقنية", "Technical Feasibility", [
    "هل تتوفر التقنيات اللازمة لتنفيذ المشروع؟",
    "تقييم البنية التحتية التقنية الحالية (servers, network, software)",
    "تحديد الفجوات التقنية والحلول المناسبة لها",
    "تقييم توفر الكوادر التقنية المؤهلة لتنفيذ المشروع",
    "دراسة المخاطر التقنية وخطط التخفيف منها",
  ], 7, COLORS.secondary);

  bulletSlide(prs, "الجدوى الاقتصادية", "Economic Feasibility", [
    "تحليل التكلفة والعائد (Cost-Benefit Analysis)",
    "تقدير تكاليف التطوير والتشغيل والصيانة",
    "حساب فترة استرداد الاستثمار (ROI)",
    "مقارنة تكاليف تطوير النظام مقابل الاستمرار الحالي",
    "الحصول على موافقة الإدارة المالية والميزانية",
  ], 8, COLORS.accent);

  bulletSlide(prs, "الجدوى التشغيلية", "Operational Feasibility", [
    "هل يُلبّي النظام الجديد احتياجات المستخدمين الفعلية؟",
    "تقييم مدى قبول الموظفين للنظام الجديد",
    "دراسة التأثير على العمليات التشغيلية الحالية",
    "التخطيط لإدارة التغيير وبرامج التدريب",
    "تقييم التوافق مع السياسات والإجراءات المؤسسية",
  ], 9, COLORS.teal);

  // Slide 10 – Resources & Timeline
  const s10 = prs.addSlide();
  addBg(s10, COLORS.light);
  addHeader(s10, "تحديد الموارد والجدول الزمني", "Resources & Project Schedule");
  const resources = [
    { label: "الموارد البشرية\nHuman Resources", color: COLORS.primary },
    { label: "الموارد المالية\nFinancial Resources", color: COLORS.accent },
    { label: "الموارد التقنية\nTechnical Resources", color: COLORS.secondary },
    { label: "الموارد الزمنية\nTime Resources", color: COLORS.teal },
  ];
  boxGrid(s10, resources, 1.7);
  // Gantt-like visual
  const tasks = ["التخطيط", "التحليل", "التصميم", "التطبيق", "الاختبار"];
  const gColors = [COLORS.primary, COLORS.secondary, COLORS.teal, COLORS.accent, COLORS.purple];
  tasks.forEach((t, i) => {
    s10.addText(t, { x: 0.2, y: 3.35 + i * 0.55, w: 1.3, h: 0.48, fontSize: 12, color: COLORS.dark, align: "right", rtlMode: true, valign: "middle", fontFace: "Arial" });
    s10.addShape("rect", { x: 1.55, y: 3.4 + i * 0.55, w: (i + 1) * 1.5, h: 0.38, fill: { color: gColors[i] }, rectRadius: 0.04 });
    s10.addText(`${(i + 1) * 2} أسابيع`, { x: 1.6, y: 3.4 + i * 0.55, w: (i + 1) * 1.5, h: 0.38, fontSize: 11, color: COLORS.white, align: "center", valign: "middle", fontFace: "Arial" });
  });
  s10.addText("الجدول الزمني التقديري (Gantt Chart مبسّط)", { x: 0.3, y: 6.25, w: 9.3, h: 0.4, fontSize: 12, color: COLORS.gray, bold: true, align: "center", rtlMode: true, fontFace: "Arial" });
  addFooter(s10, 10);

  // Planning process flow
  const s11 = prs.addSlide();
  addBg(s11, COLORS.light);
  addHeader(s11, "مسار عملية التخطيط", "Planning Process Flow");
  processFlow(s11, ["تحديد\nالمشكلة", "تحليل\nالوضع الراهن", "دراسة\nالجدوى", "تحديد\nالموارد", "إعداد\nالخطة", "الموافقة\nوالإطلاق"], 2.5,
    [COLORS.primary, COLORS.secondary, COLORS.teal, COLORS.accent, COLORS.purple, COLORS.green]);
  const notes = ["كل خطوة تُبنى على نتائج الخطوة السابقة", "الفشل في التخطيط = التخطيط للفشل", "التوثيق الجيد في كل خطوة يضمن نجاح المشروع"];
  notes.forEach((n, i) => {
    s11.addShape("rect", { x: 0.3, y: 3.9 + i * 0.85, w: 0.15, h: 0.65, fill: { color: COLORS.accent } });
    s11.addText(n, { x: 0.6, y: 3.9 + i * 0.85, w: 9.0, h: 0.65, fontSize: 15, color: COLORS.dark, align: "right", rtlMode: true, valign: "middle", fontFace: "Arial" });
  });
  addFooter(s11, 11);

  conclusionSlide(prs, [
    "مرحلة التخطيط هي الأساس الذي يُبنى عليه نجاح المشروع",
    "دراسة الجدوى الثلاثية تضمن قرارات مبنية على البيانات",
    "تحديد الأهداف الذكية يوجّه جهود الفريق بفاعلية",
    "الجدول الزمني والموارد يُحددان نطاق التنفيذ الفعلي",
    "التوثيق الجيد في هذه المرحلة يوفر وقتاً وتكلفة كبيرة",
  ], 12);

  prs.writeFile({ fileName: "Presentation_04.pptx" });
  console.log("✅  Presentation_04.pptx created");
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRESENTATION 5 – Types of IS
// ═══════════════════════════════════════════════════════════════════════════════
function createPres05() {
  const prs = newPres();

  titleSlide(prs, "أنواع نظم المعلومات الرئيسية", "Main Types of Information Systems", "جامعة | كلية تقنية المعلومات", "2025 / 2026");

  // Agenda
  const s2 = prs.addSlide();
  addBg(s2, COLORS.light);
  addHeader(s2, "محتوى العرض", "Agenda");
  ["مقدمة عن أنواع نظم المعلومات", "نظم معالجة المعاملات TPS", "نظم المعلومات الإدارية MIS", "نظم دعم القرار DSS", "نظم المعلومات التنفيذية EIS", "مقارنة شاملة بين الأنواع", "هيكل الأنظمة المتكاملة", "الخلاصة"].forEach((item, i) => {
    const c = [COLORS.primary, COLORS.secondary, COLORS.teal, COLORS.accent, COLORS.purple, COLORS.green, COLORS.gray, COLORS.primary][i];
    s2.addShape("rect", { x: 0.3, y: 1.55 + i * 0.65, w: 0.5, h: 0.5, fill: { color: c }, rectRadius: 0.05 });
    s2.addText(`${i + 1}`, { x: 0.3, y: 1.55 + i * 0.65, w: 0.5, h: 0.5, fontSize: 14, color: COLORS.white, bold: true, align: "center", valign: "middle", fontFace: "Arial" });
    s2.addText(item, { x: 1.0, y: 1.55 + i * 0.65, w: 8.5, h: 0.5, fontSize: 16, color: COLORS.dark, align: "right", rtlMode: true, valign: "middle", fontFace: "Arial" });
  });
  addFooter(s2, 2);

  // Slide 3 – Introduction
  bulletSlide(prs, "مقدمة عن أنواع نظم المعلومات", "IS Types Introduction", [
    "تُصنَّف نظم المعلومات حسب مستوى الإدارة الذي تخدمه",
    "كل نوع يخدم احتياجات مختلفة ويستهدف مستوى إدارياً محدداً",
    "الأنظمة الأربعة الرئيسية: TPS, MIS, DSS, EIS",
    "تعمل هذه الأنظمة بشكل متكامل ومتداخل في المنظمة",
    "اختيار النظام المناسب يعتمد على طبيعة القرار والمستوى الإداري",
  ], 3);

  // Slide 4 – TPS
  const s4 = prs.addSlide();
  addBg(s4, COLORS.light);
  addHeader(s4, "نظم معالجة المعاملات", "Transaction Processing Systems (TPS)");
  s4.addShape("rect", { x: 0.3, y: 1.6, w: 4.5, h: 4.5, fill: { color: COLORS.secondary, transparency: 10 }, rectRadius: 0.12 });
  s4.addText("TPS", { x: 0.3, y: 1.6, w: 4.5, h: 0.7, fontSize: 28, color: COLORS.white, bold: true, align: "center", valign: "middle", fontFace: "Arial" });
  const tpsPoints = ["يُعالج المعاملات اليومية الروتينية", "يعمل على المستوى التشغيلي", "يتميز بسرعة المعالجة ودقتها", "أمثلة: نقاط البيع، ATM، الرواتب"];
  tpsPoints.forEach((p, i) => {
    s4.addShape("rect", { x: 0.45, y: 2.45 + i * 0.82, w: 0.12, h: 0.62, fill: { color: COLORS.accent } });
    s4.addText(p, { x: 0.65, y: 2.45 + i * 0.82, w: 4.0, h: 0.62, fontSize: 13, color: COLORS.white, rtlMode: true, align: "right", valign: "middle", fontFace: "Arial" });
  });
  processFlow(s4, ["إدخال\nالمعاملة", "المعالجة\nالفورية", "تحديث\nقاعدة البيانات", "التقرير\nالفوري"], 1.7, [COLORS.primary, COLORS.teal, COLORS.secondary, COLORS.accent]);
  // right side empty to balance layout
  s4.addText("المستوى: التشغيلي | السرعة: عالية جداً | الحجم: ضخم", {
    x: 5.0, y: 4.5, w: 4.8, h: 1.4,
    fontSize: 14, color: COLORS.primary, bold: true, align: "center", valign: "middle", rtlMode: true, fontFace: "Arial",
  });
  addFooter(s4, 4);

  // Slide 5 – MIS
  const s5 = prs.addSlide();
  addBg(s5, COLORS.light);
  addHeader(s5, "نظم المعلومات الإدارية", "Management Information Systems (MIS)");
  s5.addShape("rect", { x: 0.3, y: 1.6, w: 4.5, h: 4.5, fill: { color: COLORS.teal, transparency: 10 }, rectRadius: 0.12 });
  s5.addText("MIS", { x: 0.3, y: 1.6, w: 4.5, h: 0.7, fontSize: 28, color: COLORS.white, bold: true, align: "center", valign: "middle", fontFace: "Arial" });
  const misPoints = ["يُنتج تقارير دورية منظمة للإدارة الوسطى", "يبني على بيانات TPS ويلخصها", "يدعم القرارات شبه المهيكلة", "أمثلة: تقارير المبيعات، كشوف الرواتب"];
  misPoints.forEach((p, i) => {
    s5.addShape("rect", { x: 0.45, y: 2.45 + i * 0.82, w: 0.12, h: 0.62, fill: { color: COLORS.accent } });
    s5.addText(p, { x: 0.65, y: 2.45 + i * 0.82, w: 4.0, h: 0.62, fontSize: 13, color: COLORS.white, rtlMode: true, align: "right", valign: "middle", fontFace: "Arial" });
  });
  s5.addShape("rect", { x: 5.0, y: 1.65, w: 4.8, h: 4.4, fill: { color: COLORS.white }, line: { color: COLORS.teal, width: 1.5 }, rectRadius: 0.1 });
  ["تقرير يومي", "تقرير أسبوعي", "تقرير شهري", "تقرير سنوي"].forEach((r, i) => {
    s5.addShape("rect", { x: 5.2, y: 1.8 + i * 0.95, w: 4.4, h: 0.75, fill: { color: [COLORS.teal, COLORS.secondary, COLORS.primary, COLORS.accent][i] }, rectRadius: 0.06 });
    s5.addText(r, { x: 5.2, y: 1.8 + i * 0.95, w: 4.4, h: 0.75, fontSize: 14, color: COLORS.white, bold: true, align: "center", valign: "middle", rtlMode: true, fontFace: "Arial" });
  });
  addFooter(s5, 5);

  // Slide 6 – DSS
  bulletSlide(prs, "نظم دعم القرار", "Decision Support Systems (DSS)", [
    "يُساعد الإدارة العليا في اتخاذ القرارات غير الهيكلية",
    "يدمج البيانات من مصادر متعددة ويُحلّلها",
    "يستخدم النمذجة الرياضية وتحليل What-If",
    "يتميز بالتفاعلية والمرونة في استعراض السيناريوهات",
    "أمثلة: نظام دعم قرار الاستثمار، تحليل السوق",
    "يوفر لوحات معلومات تفاعلية (Interactive Dashboards)",
  ], 6, COLORS.accent);

  // Slide 7 – EIS
  bulletSlide(prs, "نظم المعلومات التنفيذية", "Executive Information Systems (EIS)", [
    "يخدم الإدارة العليا (المديرون التنفيذيون، مجلس الإدارة)",
    "يُقدّم ملخصات عالية المستوى للأداء المؤسسي",
    "يستخدم مؤشرات الأداء الرئيسية (KPIs) والرسوم البيانية",
    "يُتيح التعمق (Drill-Down) للحصول على تفاصيل إضافية",
    "يُبنى على بيانات من TPS, MIS, DSS معاً",
    "أمثلة: لوحات متابعة الأداء الاستراتيجي",
  ], 7, COLORS.purple);

  // Slide 8 – Comprehensive comparison table
  const s8 = prs.addSlide();
  addBg(s8, COLORS.light);
  addHeader(s8, "مقارنة شاملة بين أنواع نظم المعلومات", "Comprehensive IS Comparison");
  const cHeaders = ["المعيار", "TPS", "MIS", "DSS", "EIS"];
  const cRows = [
    ["المستوى الإداري", "تشغيلي", "وسط", "أعلى", "تنفيذي"],
    ["نوع القرار", "روتيني", "شبه هيكلي", "غير هيكلي", "استراتيجي"],
    ["المستخدم الرئيسي", "موظف", "مدير وسط", "محلل", "مدير تنفيذي"],
    ["تكرار الاستخدام", "يومي/لحظي", "دوري", "عند الحاجة", "مستمر"],
    ["حجم البيانات", "ضخم جداً", "متوسط", "متنوع", "ملخّص"],
  ];
  const cw2 = 9.4 / 5;
  cHeaders.forEach((h, i) => {
    const hColors = [COLORS.gray, COLORS.secondary, COLORS.teal, COLORS.accent, COLORS.purple];
    s8.addShape("rect", { x: 0.2 + i * cw2, y: 1.65, w: cw2 - 0.04, h: 0.5, fill: { color: hColors[i] } });
    s8.addText(h, { x: 0.2 + i * cw2, y: 1.65, w: cw2 - 0.04, h: 0.5, fontSize: 12, color: COLORS.white, bold: true, align: "center", valign: "middle", rtlMode: true, fontFace: "Arial" });
  });
  cRows.forEach((row, ri) => {
    const bg = ri % 2 === 0 ? "FDFEFE" : "EBF5FB";
    row.forEach((cell, ci) => {
      s8.addShape("rect", { x: 0.2 + ci * cw2, y: 2.2 + ri * 0.8, w: cw2 - 0.04, h: 0.75, fill: { color: bg }, line: { color: "D6DBDF", width: 0.5 } });
      s8.addText(cell, { x: 0.2 + ci * cw2, y: 2.2 + ri * 0.8, w: cw2 - 0.04, h: 0.75, fontSize: 11, color: COLORS.dark, align: "center", valign: "middle", rtlMode: true, fontFace: "Arial" });
    });
  });
  addFooter(s8, 8);

  // Slide 9 – Pyramid architecture
  const s9 = prs.addSlide();
  addBg(s9, COLORS.light);
  addHeader(s9, "هرم نظم المعلومات في المنظمة", "IS Pyramid Architecture");
  const pyramid = [
    { label: "EIS – الإدارة التنفيذية", y: 1.8, x: 3.8, w: 2.3, h: 0.85, color: COLORS.purple },
    { label: "DSS – دعم القرار", y: 2.75, x: 3.0, w: 3.8, h: 0.85, color: COLORS.accent },
    { label: "MIS – نظم المعلومات الإدارية", y: 3.7, x: 1.8, w: 6.2, h: 0.85, color: COLORS.teal },
    { label: "TPS – معالجة المعاملات", y: 4.65, x: 0.3, w: 9.3, h: 0.85, color: COLORS.secondary },
  ];
  pyramid.forEach((p) => {
    s9.addShape("rect", { x: p.x, y: p.y, w: p.w, h: p.h, fill: { color: p.color }, rectRadius: 0.06 });
    s9.addText(p.label, { x: p.x, y: p.y, w: p.w, h: p.h, fontSize: 14, color: COLORS.white, bold: true, align: "center", valign: "middle", rtlMode: true, fontFace: "Arial" });
  });
  s9.addText("يمثل الهرم التكامل بين أنواع نظم المعلومات من الأسفل (التشغيلي) إلى الأعلى (الاستراتيجي)", {
    x: 0.3, y: 5.7, w: 9.3, h: 0.55,
    fontSize: 12, color: COLORS.primary, bold: true, align: "center", rtlMode: true, fontFace: "Arial",
  });
  addFooter(s9, 9);

  // Slide 10 – Use cases
  bulletSlide(prs, "أمثلة تطبيقية لكل نوع", "Practical Examples", [
    "TPS: نظام نقاط البيع في المتاجر، الصرافة الآلية، أنظمة الحجز",
    "MIS: تقارير أداء المبيعات الشهرية، تحليل الإنتاجية",
    "DSS: تحليل بدائل الاستثمار، تقييم مخاطر الائتمان البنكي",
    "EIS: لوحة متابعة KPIs للمدير التنفيذي، التقارير الاستراتيجية",
    "التكامل: ERP, CRM, SCM كأمثلة على الأنظمة المتكاملة الحديثة",
  ], 10, COLORS.green);

  // Conclusion
  conclusionSlide(prs, [
    "تُصنَّف نظم المعلومات حسب المستوى الإداري الذي تخدمه",
    "TPS يُعالج العمليات اليومية الروتينية بسرعة ودقة عالية",
    "MIS يُنتج تقارير دورية لدعم قرارات الإدارة الوسطى",
    "DSS يدعم القرارات غير الهيكلية عبر تحليل متعدد الأبعاد",
    "EIS يُزوّد الإدارة العليا برؤية استراتيجية شاملة للأداء",
  ], 11);

  prs.writeFile({ fileName: "Presentation_05.pptx" });
  console.log("✅  Presentation_05.pptx created");
}

// ─── Run all ──────────────────────────────────────────────────────────────────
createPres01();
createPres02();
createPres03();
createPres04();
createPres05();
console.log("\n🎉  All 5 presentations generated successfully!");
