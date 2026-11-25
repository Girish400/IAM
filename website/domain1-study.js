const content = document.querySelector("#guide-content");
const toc = document.querySelector("#table-of-contents");

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
function inline(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}
const slug = (value) => value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function renderMarkdown(source) {
  const lines = source.replaceAll("\r", "").split("\n");
  const out = [];
  const headings = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i += 1; continue; }
    const heading = /^(#{1,4})\s+(.+)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const title = heading[2].replace(/\s+#*$/, "");
      const id = slug(title);
      out.push(`<h${level} id="${id}">${inline(title)}</h${level}>`);
      if (level >= 2) headings.push({ level, title, id });
      i += 1;
      continue;
    }
    if (/^\|/.test(line) && i + 1 < lines.length && /^\|?[\s:|-]+\|/.test(lines[i + 1])) {
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        const cells = lines[i].split("|").slice(1, -1).map((cell) => cell.trim());
        if (!cells.every((cell) => /^:?-{3,}:?$/.test(cell))) rows.push(cells);
        i += 1;
      }
      if (rows.length) {
        const [head, ...body] = rows;
        out.push(`<div class="table-wrap"><table><thead><tr>${head.map((cell) => `<th>${inline(cell)}</th>`).join("")}</tr></thead><tbody>${body.map((row) => `<tr>${head.map((_, index) => `<td>${inline(row[index] || "")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      }
      continue;
    }
    if (/^---+$/.test(line.trim())) { out.push("<hr>"); i += 1; continue; }
    const list = /^(\s*)([-*]|\d+\.)\s+(.+)$/.exec(line);
    if (list) {
      const ordered = /\d/.test(list[2]);
      const tag = ordered ? "ol" : "ul";
      const items = [];
      while (i < lines.length) {
        const item = /^(\s*)([-*]|\d+\.)\s+(.+)$/.exec(lines[i]);
        if (!item || /\d/.test(item[2]) !== ordered) break;
        items.push(`<li>${inline(item[3])}</li>`);
        i += 1;
      }
      out.push(`<${tag}>${items.join("")}</${tag}>`);
      continue;
    }
    if (/^>\s?/.test(line)) { out.push(`<blockquote>${inline(line.replace(/^>\s?/, ""))}</blockquote>`); i += 1; continue; }
    const paragraph = [line.trim()];
    i += 1;
    while (i < lines.length && lines[i].trim() && !/^(#{1,4})\s|^\||^---+$|^\s*(?:[-*]|\d+\.)\s|^>/.test(lines[i])) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    out.push(`<p>${inline(paragraph.join(" "))}</p>`);
  }
  content.innerHTML = out.join("\n");
  toc.innerHTML = headings.map(({ level, title, id }) => `<a class="${level > 2 ? "sub" : ""}" href="#${id}">${escapeHtml(title.replace(/^\d+(?:\.\d+)*\s*/, ""))}</a>`).join("");
  document.querySelectorAll(".guide h2").forEach((h) => {
    if (/^(\d+\.\d+|Key terms|Flash cards|Multiple-choice|Last-pass)/.test(h.textContent)) h.classList.add("guide-section");
  });
}

fetch("./resources/domain1-study-guide.md")
  .then((response) => { if (!response.ok) throw new Error("Study guide is unavailable."); return response.text(); })
  .then(renderMarkdown)
  .catch(() => { content.innerHTML = '<div class="load-error"><h1>Study guide unavailable</h1><p>Try again in a moment, or <a href="./resources/domain1-study-guide.md">open the guide text directly</a>.</p></div>'; });

const progress = document.querySelector("#progress-fill");
function updateProgress() {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${range > 0 ? Math.min(100, window.scrollY / range * 100) : 0}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const link = toc.querySelector(`a[href="#${CSS.escape(entry.target.id)}"]`);
    if (link) {
      toc.querySelectorAll("a").forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    }
  });
}, { rootMargin: "-15% 0px -75% 0px" });
new MutationObserver(() => content.querySelectorAll("h2[id],h3[id],h4[id]").forEach((heading) => observer.observe(heading))).observe(content, { childList: true });
