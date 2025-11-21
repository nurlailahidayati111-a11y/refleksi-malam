// Galeri dinamis
const gallery = [
  { src: "assets/gallery1.jpg", caption: "Langit malam di bawah doa yang tenang." },
  { src: "assets/gallery2.jpg", caption: "Siluet kesunyian di tepi senja." },
  { src: "assets/gallery3.jpg", caption: "Lilin kecil dalam gelap yang panjang." },
  { src: "assets/gallery4.jpg", caption: "Jalan pulang di bawah cahaya rembulan." }
];

const grid = document.getElementById("galleryGrid");
gallery.forEach(img => {
  const div = document.createElement("div");
  div.className = "gallery-item";
  div.innerHTML = `<img src="${img.src}" alt="${img.caption}" loading="lazy">`;
  div.addEventListener("click", () => openLightbox(img));
  grid.appendChild(div);
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeBtn = document.getElementById("closeLightbox");

function openLightbox(img) {
  lightbox.style.display = "flex";
  lightboxImg.src = img.src;
  lightboxCaption.textContent = img.caption;
}

closeBtn.onclick = () => (lightbox.style.display = "none");
lightbox.onclick = e => {
  if (e.target === lightbox) lightbox.style.display = "none";
};

// Navbar otomatis
fetch("nav.html")
  .then(res => res.text())
  .then(html => (document.getElementById("navbar").innerHTML = html));
