const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

const footerHoverStyle = document.createElement("style");
footerHoverStyle.textContent = `
.footer-links a {
  transition: color .18s ease, text-decoration-color .18s ease;
}
.footer-links a:hover,
.footer-links a:focus-visible {
  color: var(--mint-strong);
  text-decoration-color: var(--mint-strong);
}
`;
document.head.appendChild(footerHoverStyle);

const instagramGalleryStyle = document.createElement("style");
instagramGalleryStyle.textContent = `
.instagram-gallery img {
  object-position: center center;
}
.instagram-gallery a:nth-child(1) img {
  object-position: center 28%;
}
`;
document.head.appendChild(instagramGalleryStyle);

const pricingMobileStyle = document.createElement("style");
pricingMobileStyle.textContent = `
@media (max-width: 860px) {
  .table-wrap {
    overflow-x: visible;
    max-width: 100%;
  }
  .pricing-table {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    table-layout: fixed;
  }
  .pricing-table tr {
    width: 100%;
  }
  .pricing-table td {
    min-width: 0;
    grid-template-columns: minmax(74px, 30%) minmax(0, 1fr);
  }
  .pricing-table td:nth-child(2),
  .pricing-table td:nth-child(3),
  .pricing-table td:nth-child(4) {
    white-space: normal;
    overflow-wrap: anywhere;
  }
  #panel-sitter .pricing-table td[data-label="補足"] {
    display: none;
  }
}
`;
document.head.appendChild(pricingMobileStyle);

document.querySelectorAll(".section-head h2").forEach((heading) => {
  if (heading.textContent.trim() === "こんなお悩みありませんか") {
    heading.innerHTML = 'こんな<span class="marker-yellow">お悩みありませんか</span>';
  }
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

    if (status) {
      status.textContent = "";
      status.removeAttribute("data-state");
    }

    submitButton.disabled = true;
    submitButton.textContent = "送信中...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Formspree submission failed");

      form.reset();
      if (status) {
        status.textContent = "お問い合わせありがとうございます。内容を確認のうえ、折り返しご連絡いたします。";
        status.dataset.state = "success";
      }
    } catch (error) {
      if (status) {
        status.textContent = "送信できませんでした。時間をおいて再度お試しいただくか、LINEからご相談ください。";
        status.dataset.state = "error";
      }
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = defaultButtonText;
    }
  });
});