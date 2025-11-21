// Navbar otomatis
fetch("nav.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar").innerHTML = html;
    initModeToggle();
  });

// Mode malam/siang
function initModeToggle() {
  const body = document.body;
  const toggle = document.getElementById("modeToggle");
  const savedMode = localStorage.getItem("mode");
  if (savedMode === "day") body.classList.add("day-mode");

  toggle.addEventListener("click", () => {
    body.classList.toggle("day-mode");
    localStorage.setItem("mode", body.classList.contains("day-mode") ? "day" : "night");
    toggle.textContent = body.classList.contains("day-mode") ? "☀️" : "🌙";
  });
}
async function submitComment() {
  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;
  await fetch("https://refleksi-api.onrender.com/comment", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name, comment })
  });
}
// 🌠 Efek bintang dan meteor
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];
let meteors = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Buat bintang
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.2,
    d: Math.random() * 0.8
  });
}

// Meteor random
function spawnMeteor() {
  meteors.push({
    x: Math.random() * window.innerWidth,
    y: -20,
    len: Math.random() * 80 + 30,
    speed: Math.random() * 10 + 10
  });
}
setInterval(spawnMeteor, 3000 + Math.random() * 4000);

// Animasi langit
function drawSky() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bintang berkelap-kelip
  for (let s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.5 + Math.random() * 0.5})`;
    ctx.fill();
  }

  // Meteor jatuh
  for (let m of meteors) {
    ctx.beginPath();
    const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.len, m.y + m.len);
    grad.addColorStop(0, "white");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x - m.len, m.y + m.len);
    ctx.stroke();
    m.x -= m.speed;
    m.y += m.speed;
  }

  meteors = meteors.filter(m => m.y < window.innerHeight + 100);
  requestAnimationFrame(drawSky);
}
drawSky();

// 🎵 Tombol suara malam
const audio = document.getElementById("ambient");

function initAudioButton() {
  const btn = document.createElement("button");
  btn.textContent = "🔊 Suara Malam";
  btn.className = "audio-btn";
  Object.assign(btn.style, {
    position: "fixed",
    bottom: "15px",
    right: "15px",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.1)",
    color: "#f1ead6",
    cursor: "pointer",
  });
  document.body.appendChild(btn);

  let playing = false;
  btn.addEventListener("click", () => {
    if (!playing) {
      audio.volume = 0.3;
      audio.play();
      btn.textContent = "🔇 Hening";
    } else {
      audio.pause();
      btn.textContent = "🔊 Suara Malam";
    }
    playing = !playing;
  });
}
window.addEventListener("load", initAudioButton);


