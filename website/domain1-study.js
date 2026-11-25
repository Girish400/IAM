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

function renderMarkdown(source, quiz) {
  source = moveGlossaryToEnd(source);
  const cards = readFlashCards(source);
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
      if (level === 2 && title === "Flash cards") {
        out.push(renderFlashCards(cards));
        while (i < lines.length && !/^##\s/.test(lines[i])) i += 1;
        continue;
      }
      if (level === 2 && title === "Multiple-choice practice") {
        const intro = lines.slice(i).find((candidate) => candidate.trim() && !/^#{1,4}\s/.test(candidate)) || "Choose the best answer for each question.";
        out.push(`<p class="exam-lede">${inline(intro.trim())}</p>`, renderExam(quiz));
        while (i < lines.length && !/^##\s/.test(lines[i])) i += 1;
        continue;
      }
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
  boxNotes(content);
  toc.innerHTML = headings.map(({ level, title, id }) => `<a class="${level > 2 ? "sub" : ""}" href="#${id}">${escapeHtml(title.replace(/^\d+(?:\.\d+)*\s*/, ""))}</a>`).join("");
  document.querySelectorAll(".guide h2").forEach((h) => {
    if (/^(\d+\.\d+|Key terms|Flash cards|Multiple-choice|Last-pass)/.test(h.textContent)) h.classList.add("guide-section");
  });
}

function moveGlossaryToEnd(source) {
  const start = source.indexOf("## Key terms and definitions");
  const end = source.indexOf("## Flash cards", start);
  if (start < 0 || end < 0) return source;
  const glossary = source.slice(start, end).trim();
  return `${source.slice(0, start)}${source.slice(end).trim()}\n\n${glossary}\n`;
}

function readFlashCards(source) {
  const start = source.indexOf("## Flash cards");
  const end = source.indexOf("## Multiple-choice practice", start);
  return source.slice(start, end).split("\n").filter((line) => /^\|\s*\d+\s*\|/.test(line)).map((line) => {
    const [number, front, back] = line.split("|").slice(1, 4).map((cell) => cell.trim());
    return { number, front, back };
  });
}

function readQuestions(source, externalQuestions = []) {
  if (externalQuestions.length) return externalQuestions.map((q, index) => ({
    number: index + 1,
    prompt: q.question,
    options: q.options,
    answer: q.answer,
    multiple: q.multiple,
    rationale: q.explanation,
  }));
  const start = source.indexOf("### Questions");
  const end = source.indexOf("### Answer key and rationales", start);
  const qLines = source.slice(start, end).split("\n");
  const questions = [];
  for (let i = 0; i < qLines.length; i += 1) {
    const match = /^\s*(\d+)\.\s+(.+)$/.exec(qLines[i]);
    if (!match) continue;
    const optionsLine = qLines[i + 1] || "";
    const options = [...optionsLine.matchAll(/(?:^|\s)([A-D])\.\s+(.+?)(?=\s+[A-D]\.\s+|$)/g)].map((item) => ({ letter: item[1], text: item[2].trim() }));
    questions.push({ number: Number(match[1]), prompt: match[2], options });
  }
  const keyStart = end + "### Answer key and rationales".length;
  const rationaleEnd = source.indexOf("## Last-pass exam reminders", keyStart);
  const rationaleText = source.slice(keyStart, rationaleEnd < 0 ? undefined : rationaleEnd);
  for (const q of questions) {
    const next = q.number < questions.length ? `(?=\\s+${q.number + 1}\\. \\*\\*[A-D]\\*\\*|$)` : "$";
    const answer = new RegExp(`(?:^|\\s)${q.number}\\. \\*\\*([A-D])\\*\\* — ([\\s\\S]*?)${next}`).exec(rationaleText);
    q.answer = answer?.[1] || "";
    q.rationale = answer?.[2]?.trim() || "Review the related objective and notes.";
  }
  return questions;
}

function renderFlashCards(cards) {
  const cardMarkup = cards.map((card, index) => `<button class="flip-card" type="button" aria-label="Flash card ${index + 1}. Activate to flip."><span class="flip-inner"><span class="flip-face flip-front"><span class="flip-kicker">CARD ${String(index + 1).padStart(2, "0")} / ${cards.length}</span><span class="flip-prompt">${inline(card.front)}</span><span class="flip-hint">Hover or tap to reveal <span aria-hidden="true">↗</span></span></span><span class="flip-face flip-back"><span class="flip-kicker">ANSWER</span><span class="flip-answer">${inline(card.back)}</span><span class="flip-hint">Hover or tap to return <span aria-hidden="true">↶</span></span></span></span></button>`).join("");
  return `<div class="flashcard-tools"><p>Try to recall the answer first. Hover over a card or tap it to flip.</p><span>${cards.length} CARDS</span></div><div class="flip-grid">${cardMarkup}</div>`;
}

function renderExam(questions) {
  const questionMarkup = questions.map((q) => `<fieldset class="exam-question" data-question="${q.number}"><legend><span class="question-number">${String(q.number).padStart(2, "0")}</span>${inline(q.prompt)}${q.multiple ? " <small>Select all that apply.</small>" : ""}</legend><div class="exam-options">${q.options.map(({ letter, text }) => `<label class="exam-option"><input type="${q.multiple ? "checkbox" : "radio"}" name="q${q.number}" value="${letter}"><span class="option-letter">${letter}</span><span>${inline(text)}</span></label>`).join("")}</div><div class="question-feedback" aria-live="polite"></div></fieldset>`).join("");
  return `<section class="exam-panel" aria-label="Domain ${domainNumber} multiple-choice exam"><div class="exam-toolbar"><div><strong>Domain ${domainNumber} practice exam</strong><span>${questions.length} questions · one attempt at a time</span></div><div class="exam-progress"><span id="exam-progress-label">0 / ${questions.length} answered</span><span class="progress-track"><i id="exam-progress-fill"></i></span></div></div><button id="start-exam" class="exam-primary" type="button">Start exam <span aria-hidden="true">→</span></button><form id="domain1-exam" class="exam-form" hidden><div class="exam-question-list">${questionMarkup}</div><div class="exam-submit-row"><span id="exam-answered">0 of ${questions.length} answered</span><button class="exam-primary" type="submit">Submit exam</button></div></form><section id="exam-results" class="exam-results" aria-live="polite" hidden></section></section>`;
}

function boxNotes(root) {
  const source = [...root.childNodes];
  const stack = [];
  const result = [];
  for (const node of source) {
    if (node.nodeType === Node.ELEMENT_NODE && /^H[2-4]$/.test(node.tagName)) {
      const level = Number(node.tagName.slice(1));
      while (stack.length && stack.at(-1).level >= level) stack.pop();
      const section = document.createElement("section");
      section.className = `note-box note-level-${level}`;
      node.classList.add("note-heading");
      section.append(node);
      const parent = stack.at(-1)?.section;
      if (parent) parent.append(section); else result.push(section);
      stack.push({ level, section });
    } else {
      const parent = stack.at(-1)?.section;
      if (parent) parent.append(node); else result.push(node);
    }
  }
  root.replaceChildren(...result);
}

function initStudyInteractions() {
  document.querySelectorAll(".flip-card").forEach((card) => card.addEventListener("click", () => card.classList.toggle("flipped")));
  const start = document.querySelector("#start-exam");
  const form = document.querySelector("#domain1-exam");
  if (!start || !form) return;
  const results = document.querySelector("#exam-results");
  const questions = [...form.querySelectorAll(".exam-question")];
  const updateCount = () => {
    const answered = questions.filter((question) => question.querySelector("input:checked")).length;
    document.querySelector("#exam-answered").textContent = `${answered} of ${questions.length} answered`;
    document.querySelector("#exam-progress-label").textContent = `${answered} / ${questions.length} answered`;
    document.querySelector("#exam-progress-fill").style.width = `${answered / questions.length * 100}%`;
  };
  form.addEventListener("change", updateCount);
  start.addEventListener("click", () => { start.hidden = true; form.hidden = false; form.querySelector("input")?.focus(); });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let score = 0;
    questions.forEach((question, index) => {
      const selected = [...question.querySelectorAll("input:checked")].map((input) => input.value).sort();
      const correct = quizAnswerFor(question.dataset.question).slice().sort();
      const feedback = question.querySelector(".question-feedback");
      correct.forEach((letter) => question.querySelector(`input[value="${letter}"]`)?.closest("label")?.classList.add("is-correct"));
      if (selected.join(",") === correct.join(",")) { score += 1; question.classList.add("answered-correct"); }
      else {
        question.classList.add("answered-incorrect");
        selected.filter((letter) => !correct.includes(letter)).forEach((letter) => question.querySelector(`input[value="${letter}"]`)?.closest("label")?.classList.add("is-incorrect"));
      }
      feedback.innerHTML = `<strong>Correct answer: ${correct.join(", ")}.</strong> ${inline(examQuestions[index].rationale)}`;
      question.querySelectorAll("input").forEach((input) => { input.disabled = true; });
    });
    const percent = Math.round(score / questions.length * 100);
    results.innerHTML = `<div class="score-ring" style="--score:${percent}%"><div><strong>${score}/${questions.length}</strong><span>${percent}%</span></div></div><div class="score-copy"><span class="score-kicker">EXAM COMPLETE</span><h3>${percent >= 80 ? "Strong work. Keep it sharp." : "Good checkpoint. Review and retry."}</h3><p>You answered ${score} of ${questions.length} questions correctly. Correct answers and rationales are shown below each question.</p><button class="exam-secondary" id="retake-exam" type="button">Try again</button></div>`;
    results.hidden = false;
    form.querySelectorAll("input").forEach((input) => { input.disabled = true; });
    form.querySelector("button[type=submit]").disabled = true;
    results.scrollIntoView({ behavior: "smooth", block: "center" });
    document.querySelector("#retake-exam").addEventListener("click", () => {
      form.reset();
      form.querySelectorAll("input").forEach((input) => { input.disabled = false; });
      form.querySelectorAll(".exam-question").forEach((question) => question.classList.remove("answered-correct", "answered-incorrect"));
      form.querySelectorAll(".exam-option").forEach((option) => option.classList.remove("is-correct", "is-incorrect"));
      form.querySelectorAll(".question-feedback").forEach((feedback) => { feedback.innerHTML = ""; });
      form.querySelector("button[type=submit]").disabled = false;
      results.hidden = true;
      start.hidden = false;
      form.hidden = true;
      updateCount();
      start.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
}

let examQuestions = [];
const domainNumber = Number(location.pathname.match(/domain(\d+)-study/)?.[1] || 1);
const domainNames = { 1: "Security and Risk Management", 2: "Asset Security", 3: "Security Architecture and Engineering", 4: "Communication and Network Security", 5: "Identity and Access Management", 6: "Security Assessment and Testing", 7: "Security Operations", 8: "Software Development Security" };
function quizAnswerFor(number) { return examQuestions.find((question) => question.number === Number(number))?.answer || []; }

document.querySelector(".eyebrow").innerHTML = `<span class="eyebrow-dot"></span> CISSP · DOMAIN ${String(domainNumber).padStart(2, "0")}`;
document.querySelector(".hero h1").innerHTML = `${domainNames[domainNumber]}<br><em>Study Guide</em>`;
document.querySelector(".hero-copy").textContent = "Review the domain objectives, build recall with interactive cards, then take the complete chapter-mapped exam and review your score and rationales.";
document.title = `Domain ${domainNumber} Study Guide | CISSP Study Hub`;
const guidePath = `./resources/domain${domainNumber}-study-guide.md`;
Promise.all([
  fetch(guidePath).then((response) => { if (!response.ok) throw new Error("Study guide is unavailable."); return response.text(); }),
  fetch("./resources/domain-question-bank.json").then((response) => { if (!response.ok) throw new Error("Question bank is unavailable."); return response.json(); }),
]).then(([source, bank]) => {
  examQuestions = readQuestions(source, bank.domains[String(domainNumber)] || []);
  renderMarkdown(source, examQuestions);
  const stats = document.querySelectorAll(".hero-stats strong");
  stats[0].textContent = (source.match(/^#{2,3}\s+\d+\.\d+(?:\s|$)/gm) || []).length;
  stats[1].textContent = readFlashCards(source).length;
  stats[2].textContent = examQuestions.length;
  initStudyInteractions();
}).catch(() => { content.innerHTML = `<div class="load-error"><h1>Study guide unavailable</h1><p>Try again in a moment, or <a href="${guidePath}">open the guide text directly</a>.</p></div>`; });

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
