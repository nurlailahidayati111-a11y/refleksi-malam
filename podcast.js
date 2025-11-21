// Data podcast
const podcasts = [
  {
    title: "Malam dan Doa yang Tidak Tersampaikan",
    desc: "Renungan lembut tentang doa yang menunggu waktu terbaik.",
    file: "assets/podcast1.mp3",
  },
  {
    title: "Sabar dalam Sunyi",
    desc: "Tentang bagaimana kesunyian justru menguatkan jiwa.",
    file: "assets/podcast2.mp3",
  },
  {
    title: "Hening yang Mengajarkan Makna",
    desc: "Refleksi malam tentang diam dan kedekatan dengan Sang Pencipta.",
    file: "assets/podcast3.mp3",
  }
];

const list = document.getElementById("podcastList");

podcasts.forEach(p => {
  const div = document.createElement("div");
  div.className = "podcast-item";
  div.innerHTML = `
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
    <audio controls preload="none">
      <source src="${p.file}" type="audio/mpeg">
      Browser Anda tidak mendukung audio.
    </audio>
  `;
  list.appendChild(div);
});

// Navbar otomatis
fetch("nav.html")
  .then(res => res.text())
  .then(html => (document.getElementById("navbar").innerHTML = html));
