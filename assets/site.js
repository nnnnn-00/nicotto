const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const contactForm = document.querySelector("[data-contact-form]");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const subject = encodeURIComponent("nicottoへの相談");
    const body = encodeURIComponent(
      `お名前: ${data.get("name") || ""}\n` +
      `お子様の生年月日: ${data.get("birthday") || ""}\n` +
      `メール: ${data.get("email") || ""}\n` +
      `電話番号: ${data.get("tel") || ""}\n` +
      `緊急連絡先: ${data.get("emergency") || ""}\n` +
      `相談内容: ${data.get("service") || ""}\n\n` +
      `知ったきっかけ: ${data.get("source") || ""}\n\n` +
      `${data.get("message") || ""}`
    );
    window.location.href = `mailto:info@example.com?subject=${subject}&body=${body}`;
  });
}
