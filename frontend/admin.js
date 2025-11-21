// --- URL backend (ubah ke domain backend kamu jika sudah online) ---
const API_URL = "http://localhost:5000";

let isLoggedIn = false;

// Saat tombol login diklik
document.getElementById("loginBtn").addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!username || !password) return alert("Isi username dan password.");

  const res = await fetch(`${API_URL}/pending-comments`);
  if (res.ok) {
    localStorage.setItem("adminUser", username);
    localStorage.setItem("adminPass", password);
    isLoggedIn = true;
    showPanel();
  } else {
    document.getElementById("loginMessage").textContent = "Gagal masuk.";
  }
});

// Tampilkan komentar belum disetujui
async function showPanel() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("commentPanel").style.display = "block";

  const res = await fetch(`${API_URL}/pending-comments`);
  const data = await res.json();
  const box = document.getElementById("pendingComments");
  box.innerHTML = "";

  if (!data.length) {
    box.innerHTML = "<p>Tidak ada komentar baru.</p>";
    return;
  }

  data.forEach(c => {
    const div = document.createElement("div");
    div.className = "comment-item";
    div.innerHTML = `
      <p><strong>${c.name}</strong>: ${c.comment}</p>
      <button onclick="approveComment(${c.id})">✅ Setujui</button>
    `;
    box.appendChild(div);
  });
}

// Setujui komentar
async function approveComment(id) {
  const username = localStorage.getItem("adminUser");
  const password = localStorage.getItem("adminPass");

  const res = await fetch(`${API_URL}/approve`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password, id })
  });

  const text = await res.text();
  alert(text);
  showPanel();
}

// Tampilkan komentar belum disetujui
app.get("/pending-comments", async (req, res) => {
  const result = await db.all("SELECT * FROM comments WHERE approved=0");
  res.json(result);
});
