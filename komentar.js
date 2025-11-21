// =====================
// KONFIGURASI SUPABASE
// =====================
const SUPABASE_URL = "https://PROJECT-REF.supabase.co";
const SUPABASE_ANON_KEY = "PASTE_ANON_KEY_MU_DISINI";

const supabase = supabaseJs.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =====================
// AMBIL SLUG ARTIKEL
// =====================
const article = document.querySelector("[data-slug]");
const articleSlug = article.dataset.slug;

// =====================
// ELEMEN HTML
// =====================
const form = document.getElementById("comment-form");
const nameInput = document.getElementById("name");
const contentInput = document.getElementById("content");
const parentInput = document.getElementById("parent_id");
const commentsList = document.getElementById("comments-list");

// =====================
// FUNGSI AMBIL KOMENTAR
// =====================
async function loadComments() {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("article_slug", articleSlug)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error load komentar:", error);
    return;
  }

  renderComments(data);
}

// =====================
// RENDER KOMENTAR + REPLY
// =====================
function renderComments(comments) {
  commentsList.innerHTML = "";

  const map = {};
  const roots = [];

  comments.forEach(comment => {
    comment.children = [];
    map[comment.id] = comment;
  });

  comments.forEach(comment => {
    if (comment.parent_id) {
      map[comment.parent_id]?.children.push(comment);
    } else {
      roots.push(comment);
    }
  });

  roots.forEach(comment => {
    commentsList.appendChild(createCommentElement(comment));
  });
}

function createCommentElement(comment, level = 0) {
  const div = document.createElement("div");
  div.className = "comment-item";
  div.style.marginLeft = `${level * 20}px`;

  const date = new Date(comment.created_at).toLocaleString("id-ID");

  div.innerHTML = `
    <strong>${comment.name}</strong>
    <small> — ${date}</small>
    <p>${comment.content}</p>
    <button data-id="${comment.id}" class="reply-btn">Balas</button>
  `;

  // Klik balas
  div.querySelector(".reply-btn").addEventListener("click", () => {
    parentInput.value = comment.id;
    contentInput.focus();
  });

  if (comment.children.length > 0) {
    comment.children.forEach(child => {
      div.appendChild(createCommentElement(child, level + 1));
    });
  }

  return div;
}

// =====================
// KIRIM KOMENTAR
// =====================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const content = contentInput.value.trim();
  const parent_id = parentInput.value || null;

  if (!name || !content) {
    alert("Nama dan komentar wajib diisi.");
    return;
  }

  const { error } = await supabase.from("comments").insert([
    {
      article_slug: articleSlug,
      parent_id,
      name,
      content
    }
  ]);

  if (error) {
    alert("Gagal kirim komentar");
    console.error(error);
    return;
  }

  form.reset();
  parentInput.value = "";
  loadComments();
});

// =====================
// JALANKAN SAAT PAGE LOAD
// =====================
loadComments();
