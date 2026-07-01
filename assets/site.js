const canonicalBaseUrl = "https://nicotto-fukuoka.com";
const normalizedPath = window.location.pathname.endsWith("/index.html") ? "/" : window.location.pathname;
const canonicalUrl = `${canonicalBaseUrl}${normalizedPath}`;
const isDayoriPaused = false;

if (isDayoriPaused && normalizedPath.startsWith("/dayori/")) {
  window.location.replace("../nicotto-dayori.html");
}

const canonicalLink = document.querySelector('link[rel="canonical"]') || document.createElement("link");
canonicalLink.rel = "canonical";
canonicalLink.href = canonicalUrl;
if (!canonicalLink.parentNode) document.head.appendChild(canonicalLink);

document.querySelectorAll('meta[property="og:url"]').forEach((meta) => meta.setAttribute("content", canonicalUrl));
document.querySelectorAll('meta[property="og:image"]').forEach((meta) => {
  const imagePath = meta.getAttribute("content")?.replace(/^https?:\/\/[^/]+(?:\/nicotto)?\//, "") || "assets/nicotto-hero.png";
  meta.setAttribute("content", `${canonicalBaseUrl}/${imagePath}`);
});

document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
  script.textContent = script.textContent.replaceAll("https://nnnnn-00.github.io/nicotto", canonicalBaseUrl);
});

const seoTitleMap = {
  "/babysitter.html": "ベビーシッター | 福岡市周辺の送迎・病児保育・単発利用 nicotto",
  "/cooking.html": "料理代行 | 福岡市周辺の作り置き・離乳食・幼児食 nicotto",
  "/pricing.html": "料金 | 福岡市のベビーシッター・料理代行 料金表 nicotto",
  "/contact.html": "お問い合わせ | 福岡市のベビーシッター・料理代行相談 nicotto",
};

if (seoTitleMap[normalizedPath]) {
  document.title = seoTitleMap[normalizedPath];
  document.querySelectorAll('meta[property="og:title"]').forEach((meta) => {
    meta.setAttribute("content", seoTitleMap[normalizedPath]);
  });
}

const injectJsonLd = (id, data) => {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

const baseProvider = {
  "@type": "LocalBusiness",
  "@id": `${canonicalBaseUrl}/#business`,
  name: "nicotto",
  url: `${canonicalBaseUrl}/`,
  areaServed: "福岡市周辺・福岡県",
};

const serviceArea = [
  "福岡市中央区",
  "福岡市博多区",
  "福岡市南区",
  "福岡市早良区",
  "福岡市東区",
  "福岡市西区",
  "福岡市城南区",
  "春日市",
  "大野城市",
  "福岡県",
];

const enhancedServiceSchemaMap = {
  "/babysitter.html": {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalBaseUrl}/babysitter.html#enhanced-service`,
    name: "福岡市周辺のベビーシッター・送迎サポート",
    serviceType: "ベビーシッター",
    category: ["ベビーシッター", "送迎サポート", "病児保育相談", "単発利用", "定期利用"],
    description: "福岡市周辺で、通常保育、保育園や習い事の送迎、食事補助、病児保育相談、単発・定期利用までご家庭に合わせてサポートします。",
    provider: baseProvider,
    areaServed: serviceArea,
    url: `${canonicalBaseUrl}/babysitter.html`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "ベビーシッター料金・対応内容",
      itemListElement: [
        { "@type": "Offer", name: "単発ベビーシッター", price: "2200", priceCurrency: "JPY", unitText: "1時間", itemOffered: { "@type": "Service", name: "単発ベビーシッター" } },
        { "@type": "Offer", name: "定期ベビーシッター", price: "1800", priceCurrency: "JPY", unitText: "1時間", itemOffered: { "@type": "Service", name: "定期ベビーシッター" } },
        { "@type": "Offer", name: "送迎サポート", price: "1500", priceCurrency: "JPY", unitText: "1回", itemOffered: { "@type": "Service", name: "送迎サポート" } },
        { "@type": "Offer", name: "病児保育相談", priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "JPY", price: "500", unitText: "1時間加算" }, itemOffered: { "@type": "Service", name: "病児保育相談" } },
      ],
    },
  },
  "/cooking.html": {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalBaseUrl}/cooking.html#enhanced-service`,
    name: "福岡市周辺の料理代行・作り置き",
    serviceType: "料理代行",
    category: ["料理代行", "作り置き", "下味冷凍", "離乳食づくり", "幼児食づくり", "買い物代行相談"],
    description: "福岡市周辺の子育て家庭向けに、作り置き、下味冷凍、離乳食、幼児食、アレルギー対応相談まで、毎日の食事づくりをサポートします。",
    provider: baseProvider,
    areaServed: serviceArea,
    url: `${canonicalBaseUrl}/cooking.html`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "料理代行料金・対応内容",
      itemListElement: [
        { "@type": "Offer", name: "料理代行 初回お試しプラン", price: "4980", priceCurrency: "JPY", itemOffered: { "@type": "Service", name: "料理代行 初回お試し" } },
        { "@type": "Offer", name: "料理代行 基本プラン", price: "5980", priceCurrency: "JPY", itemOffered: { "@type": "Service", name: "作り置き料理代行" } },
        { "@type": "Offer", name: "買い物代行", price: "1100", priceCurrency: "JPY", itemOffered: { "@type": "Service", name: "買い物代行" } },
      ],
    },
  },
  "/pricing.html": {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${canonicalBaseUrl}/pricing.html#pricing-offers`,
    name: "福岡市周辺のベビーシッター・料理代行料金表",
    description: "nicottoのベビーシッター、送迎サポート、病児保育相談、料理代行、作り置き、下味冷凍、離乳食・幼児食づくりの料金目安です。",
    url: `${canonicalBaseUrl}/pricing.html`,
    provider: baseProvider,
    itemListElement: [
      { "@type": "Offer", name: "ベビーシッター 単発依頼", price: "2200", priceCurrency: "JPY", unitText: "1時間" },
      { "@type": "Offer", name: "ベビーシッター 定期依頼", price: "1800", priceCurrency: "JPY", unitText: "1時間" },
      { "@type": "Offer", name: "送迎のみ", price: "1500", priceCurrency: "JPY", unitText: "1回" },
      { "@type": "Offer", name: "料理代行 初回お試しプラン", price: "4980", priceCurrency: "JPY" },
      { "@type": "Offer", name: "料理代行 基本プラン", price: "5980", priceCurrency: "JPY" },
      { "@type": "Offer", name: "買い物代行", price: "1100", priceCurrency: "JPY" },
    ],
  },
};

if (enhancedServiceSchemaMap[normalizedPath]) {
  injectJsonLd("enhanced-service-schema", enhancedServiceSchemaMap[normalizedPath]);
}

if (normalizedPath.endsWith("/pricing.html")) {
  const pricingFaqs = [
    ["福岡でベビーシッターを1時間だけ頼めますか？", "はい。単発依頼は1時間単位でご相談いただけます。希望日時、サポート内容、お子さまの年齢を確認したうえで対応可否をご案内します。"],
    ["福岡市で送迎のみのベビーシッター料金はいくらですか？", "送迎のみは1回1,500円です。保育園、幼稚園、習い事、ご自宅間の経路や引き渡し方法を事前に確認します。"],
    ["料理代行の作り置きだけでも頼めますか？", "はい。作り置きのみのご相談も可能です。2時間・5品保証の基本プランを目安に、ご家庭の人数や希望メニューに合わせて調整します。"],
    ["料理代行では何品くらい作れますか？", "目安は2時間で5品保証、3時間で8品前後、4時間で10〜12品前後です。キッチン環境やメニュー内容により変わるため、事前にご案内します。"],
    ["離乳食や幼児食も料金内で相談できますか？", "離乳食対応は基本時間内で無料相談できます。月齢、食べ進み、アレルギー、保存方法を確認しながら無理のない内容をご提案します。"],
    ["福岡市外でもベビーシッターや料理代行を頼めますか？", "福岡市を中心に、春日市・大野城市など福岡県内もご相談いただけます。訪問先や時間帯により対応可否と交通費を確認します。"],
  ];
  const faqContainer = document.querySelector(".faq");
  if (faqContainer && !faqContainer.dataset.enhancedPricingFaq) {
    pricingFaqs.forEach(([question, answer]) => {
      const detail = document.createElement("details");
      detail.innerHTML = `<summary>${question}</summary><p>${answer}</p>`;
      faqContainer.appendChild(detail);
    });
    faqContainer.dataset.enhancedPricingFaq = "true";
  }
  injectJsonLd("pricing-faq-schema", {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pricingFaqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  });
}

if (normalizedPath.endsWith("/nicotto-dayori.html")) {
  document.querySelectorAll("section").forEach((section) => {
    if (section.textContent.includes("カテゴリから探す")) section.remove();
  });
}

const heroImages = document.querySelectorAll(".hero img, .page-hero img");
heroImages.forEach((image) => {
  image.decoding = "async";
  image.setAttribute("fetchpriority", "high");
  image.removeAttribute("loading");
});

document.querySelectorAll("img").forEach((image) => {
  if ([...heroImages].includes(image)) return;
  if (!image.hasAttribute("loading")) image.loading = "lazy";
  image.decoding = "async";
  image.setAttribute("fetchpriority", "low");
});

const performanceStyle = document.createElement("style");
performanceStyle.textContent = `
main > section:not(.hero):not(.page-hero) {
  content-visibility: auto;
  contain-intrinsic-size: 1px 720px;
}
`;
document.head.appendChild(performanceStyle);

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

const trackEvent = (eventName, parameters = {}) => {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, { page_path: window.location.pathname, page_title: document.title, ...parameters });
};

const isNestedPage = window.location.pathname.includes("/dayori/");
const dayoriPath = isNestedPage ? "../nicotto-dayori.html" : "./nicotto-dayori.html";
const isDayoriPage = window.location.pathname.includes("/nicotto-dayori.html") || window.location.pathname.includes("/dayori/");

if (!isDayoriPaused) {
  document.querySelectorAll(".nav").forEach((navElement) => {
    if (navElement.querySelector('a[href$="nicotto-dayori.html"]')) return;
    const contactLink = navElement.querySelector('a[href$="contact.html"]');
    if (!contactLink) return;
    const dayoriLink = document.createElement("a");
    dayoriLink.href = dayoriPath;
    dayoriLink.textContent = "nicottoだより";
    if (isDayoriPage) dayoriLink.classList.add("active");
    navElement.insertBefore(dayoriLink, contactLink);
  });

  document.querySelectorAll(".footer-links").forEach((footerLinks) => {
    if (footerLinks.querySelector('a[href$="nicotto-dayori.html"]')) return;
    const contactLink = footerLinks.querySelector('a[href$="contact.html"]');
    const dayoriLink = document.createElement("a");
    dayoriLink.href = dayoriPath;
    dayoriLink.textContent = "nicottoだより";
    if (contactLink) footerLinks.insertBefore(dayoriLink, contactLink);
    else footerLinks.appendChild(dayoriLink);
  });
} else {
  document.querySelectorAll('a[href$="nicotto-dayori.html"], a[href*="/dayori/"]').forEach((link) => {
    if (!normalizedPath.endsWith("/nicotto-dayori.html")) link.remove();
  });
}

const mainStyle = document.createElement("style");
mainStyle.textContent = `
html { scroll-padding-top: 96px; }
body { padding-top: 74px; }
.site-header { position: fixed !important; top: 0; left: 0; right: 0; width: 100%; z-index: 1000; background: rgba(255,253,250,.96); box-shadow: 0 10px 26px rgba(75,54,40,.055); }
@supports (backdrop-filter: blur(12px)) { .site-header { backdrop-filter: blur(12px); } }
@media (min-width: 861px) {
  .nav > a { position: relative; display: inline-flex; align-items: center; justify-content: center; padding: 10px 14px; border-bottom: 0; border-radius: 999px; overflow: hidden; isolation: isolate; transition: color .28s ease, transform .28s ease, box-shadow .28s ease; }
  .nav > a::before { content: ""; position: absolute; inset: 3px 0; border-radius: 999px; background: linear-gradient(135deg, rgba(255,232,237,.94), rgba(255,243,201,.82) 52%, rgba(223,244,236,.82)); transform: translateY(70%) scale(.9); opacity: 0; transition: transform .32s cubic-bezier(.2,.8,.2,1), opacity .32s ease; z-index: -1; }
  .nav > a:hover::before, .nav > a:focus-visible::before, .nav > a.active::before { transform: translateY(0) scale(1); opacity: 1; }
  .nav > a:hover, .nav > a:focus-visible { color: #2f6f5d; transform: translateY(-2px); }
  .nav > a.active { color: #2f6f5d; border-color: transparent; box-shadow: 0 8px 18px rgba(75,54,40,.055); }
  .nav-icons .icon-link { border-radius: 50%; }
}
@media (max-width: 860px) {
  body { padding-top: 74px; }
  .site-header { box-shadow: 0 8px 20px rgba(75,54,40,.06); }
  .nav > a { border-radius: 12px; border-bottom: 0; transition: background .22s ease, color .22s ease, transform .22s ease; }
  .nav > a:hover, .nav > a:focus-visible, .nav > a.active { background: linear-gradient(135deg, rgba(255,232,237,.76), rgba(255,243,201,.62)); color: #2f6f5d; transform: translateY(-1px); }
}
.footer-links a { transition: color .18s ease, text-decoration-color .18s ease; }
.footer-links a:hover, .footer-links a:focus-visible { color: var(--mint-strong); text-decoration-color: var(--mint-strong); }
#area .section-inner { display: grid; grid-template-columns: minmax(0, 1fr) minmax(300px, 48%); gap: clamp(30px, 5vw, 78px); align-items: center; }
.area-copy h2 { margin: 0; color: var(--brown); font-size: clamp(2rem, 3.2vw, 2.7rem); letter-spacing: .08em; }
.area-copy h2::after { content: ""; display: block; width: 72px; height: 6px; margin: 14px 0 26px; border-radius: 999px; background: linear-gradient(90deg, rgba(255,205,216,.9), rgba(255,243,201,.9)); }
.area-copy .lead { margin-bottom: 24px; color: var(--charcoal); font-weight: 800; }
.area-tags { display: flex; flex-wrap: wrap; gap: 12px; margin: 0 0 24px; padding: 0; list-style: none; }
.area-tags li { display: inline-flex; align-items: center; min-height: 42px; padding: 9px 18px; border-radius: 999px; background: rgba(255,232,220,.72); color: var(--muted); font-weight: 900; line-height: 1.45; }
.area-note { margin: 0; color: var(--muted); font-weight: 700; }
.area-map { margin: 0; display: flex; justify-content: center; align-items: center; }
.area-map img { display: block; width: min(100%, 540px); height: auto; }
.pricing-hero .page-visual img, body:has(.page-hero.visual-hero) .page-hero.visual-hero .page-visual img[src*="assets/user-photos/"] { object-fit: cover; padding: 0; }
#panel-sitter .pricing-flow { background: linear-gradient(135deg, rgba(255,232,237,.82), rgba(255,255,255,.7)); }
#panel-sitter .pricing-flow .mini-flow span { background: var(--pink-soft); }
#panel-meal .pricing-flow { background: linear-gradient(135deg, rgba(255,248,218,.96), rgba(255,253,244,.74)); }
#panel-meal .pricing-flow .mini-flow span { background: rgba(255,241,184,.9); }
.instagram-gallery img { object-position: center center; }
.instagram-gallery a:nth-child(1) img { object-position: center 28%; }
body:has(.page-hero.visual-hero) .split-media .eyebrow { display: none; }
body:has(.page-hero.visual-hero) .split-media h2 { margin-bottom: 26px; }
body:has(.page-hero.visual-hero) .split-media h2 + .lead { margin-top: 0; }
@media (max-width: 860px) {
  #area .section-inner { grid-template-columns: 1fr; }
  .area-tags li { white-space: normal; }
  .area-map img { width: min(100%, 390px); }
  .table-wrap { overflow-x: visible; max-width: 100%; }
  .pricing-table { width: 100%; max-width: 100%; min-width: 0; table-layout: fixed; }
  .pricing-table tr { width: 100%; }
  .pricing-table td { min-width: 0; grid-template-columns: minmax(74px, 30%) minmax(0, 1fr); }
  .pricing-table td:nth-child(2), .pricing-table td:nth-child(3), .pricing-table td:nth-child(4) { white-space: normal; overflow-wrap: anywhere; }
  #panel-sitter .pricing-table td[data-label="補足"] { display: none; }
}
`;
document.head.appendChild(mainStyle);

document.querySelectorAll('a[href*="line.me"], a[href*="lin.ee"]').forEach((link) => {
  link.addEventListener("click", () => trackEvent("line_click", { event_category: "contact", event_label: link.getAttribute("aria-label") || link.textContent.trim() || "LINE", link_url: link.href }));
});

document.querySelectorAll('a[href$="pricing.html"], a[href*="pricing.html"]').forEach((link) => {
  link.addEventListener("click", () => trackEvent("pricing_click", { event_category: "navigation", event_label: link.textContent.trim() || link.getAttribute("aria-label") || "ご利用料金", link_url: link.href }));
});

if (!isDayoriPaused) {
  document.querySelectorAll('a[href$="nicotto-dayori.html"], a[href*="/dayori/"]').forEach((link) => {
    link.addEventListener("click", () => trackEvent("dayori_click", { event_category: "navigation", event_label: link.textContent.trim() || link.getAttribute("aria-label") || "nicottoだより", link_url: link.href }));
  });
}

document.querySelectorAll(".instagram-gallery").forEach((gallery) => {
  const posts = gallery.querySelectorAll("a");
  if (posts.length >= 3) gallery.insertBefore(posts[2], posts[1]);
});

document.querySelectorAll(".section-head h2").forEach((heading) => {
  if (heading.textContent.trim() === "こんなお悩みありませんか") heading.innerHTML = 'こんな<span class="marker-yellow">お悩みありませんか</span>';
});

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("[data-pricing-tabs]").forEach((tabsRoot) => {
  const tabs = Array.from(tabsRoot.querySelectorAll("[data-pricing-tab]"));
  const panels = Array.from(tabsRoot.querySelectorAll("[data-pricing-panel]"));
  const activateTab = (name) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.pricingTab === name;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });
    panels.forEach((panel) => {
      const isActive = panel.dataset.pricingPanel === name;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab.dataset.pricingTab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + direction + tabs.length) % tabs.length;
      tabs[nextIndex].focus();
      activateTab(tabs[nextIndex].dataset.pricingTab);
    });
  });
});

document.querySelectorAll("#contact-form").forEach((form) => {
  const status = form.querySelector("[data-form-status]");
  const submitButton = form.querySelector('button[type="submit"]');
  const defaultButtonText = submitButton ? submitButton.textContent : "";
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!submitButton) return;
    if (status) { status.textContent = ""; status.removeAttribute("data-state"); }
    submitButton.disabled = true;
    submitButton.textContent = "送信中...";
    try {
      const response = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Formspree submission failed");
      trackEvent("contact_form_submit", { event_category: "contact", event_label: "お問い合わせフォーム送信" });
      form.reset();
      if (status) { status.textContent = "お問い合わせありがとうございます。内容を確認のうえ、折り返しご連絡いたします。"; status.dataset.state = "success"; }
    } catch (error) {
      if (status) { status.textContent = "送信できませんでした。時間をおいて再度お試しいただくか、LINEからご相談ください。"; status.dataset.state = "error"; }
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = defaultButtonText;
    }
  });
});
