// 🌙 Efek transisi masuk
document.body.classList.add("fade");

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});

// 🌙 Efek transisi keluar saat klik link
document.addEventListener("click", function (e) {
  const link = e.target.closest("a");

  if (!link) return;

  // Abaikan link tertentu
  if (
    link.target === "_blank" ||
    link.href.startsWith("mailto:") ||
    link.href.startsWith("tel:") ||
    link.href.includes("#")
  ) return;

  e.preventDefault();
  const href = link.href;

  document.body.classList.remove("fade-in");
  document.body.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = href;
  }, 600);
});