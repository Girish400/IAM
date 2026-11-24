import { questions, domains } from "./questions.js";

const STORAGE_KEY = "cissp-practice-v1";
const $ = (id) => document.getElementById(id);
const state = { index: 0, answers: {}, flagged: [], startedAt: null, card: 0 };
const readSaved = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch { return null; } };
const views = [...document.querySelectorAll(".view")];

function showView(name) {
  views.forEach((view) => view.classList.toggle("hidden", view.id !== name));
  document.querySelectorAll("[data-view]").forEach((button) => button.classList.toggle("nav-active", button.dataset.view === name));
  history.replaceState(null, "", `#${name}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (name === "domains") renderDomains();
  if (name === "resources") renderResources();
  if (name === "flashcards") renderCard();
}

document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => {
  if (button.dataset.view === "exam") startExam(false);
  else showView(button.dataset.view);
}));

function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ index: state.index, answers: state.answers, flagged: state.flagged, startedAt: state.startedAt })); $("saved-state").textContent = "Saved on this device"; }
  catch { $("saved-state").textContent = "Browser storage unavailable"; }
}

function startExam(fresh = false) {
  const saved = readSaved();
  if (!fresh && saved && saved.answers && Number.isInteger(saved.index) && saved.index >= 0 && saved.index < questions.length) {
    state.index = saved.index; state.answers = saved.answers; state.flagged = Array.isArray(saved.flagged) ? saved.flagged : []; state.startedAt = saved.startedAt || new Date().toISOString();
  } else {
    state.index = 0; state.answers = {}; state.flagged = []; state.startedAt = new Date().toISOString();
  }
  showView("exam"); renderQuestion(); $("question-text").focus({ preventScroll: true });
}

function renderQuestion() {
  const q = questions[state.index];
  $("question-skill").textContent = q.skill;
  $("question-number").textContent = `QUESTION ${String(state.index + 1).padStart(2, "0")} / ${questions.length}`;
  $("question-text").textContent = q.question;
  $("hint-text").textContent = q.hint;
  $("hint-text").classList.add("hidden"); $("hint-button").textContent = "Show hint"; $("hint-button").setAttribute("aria-expanded", "false");
  $("flag-button").setAttribute("aria-pressed", String(state.flagged.includes(state.index)));
  $("flag-button").textContent = state.flagged.includes(state.index) ? "★ Marked for review" : "☆ Mark for review";
  $("previous-button").disabled = state.index === 0;
  $("next-button").textContent = state.index === questions.length - 1 ? "Last question" : "Next →";
  const options = $("options"); options.replaceChildren();
  q.options.forEach((option, i) => {
    const label = document.createElement("label"); label.className = "option-card flex cursor-pointer items-start gap-3 rounded-xl border border-line px-4 py-4 hover:border-teal";
    const input = document.createElement("input"); input.className = "mt-1 size-4 accent-teal"; input.type = "radio"; input.name = `q-${state.index}`; input.checked = state.answers[state.index] === i;
    input.setAttribute("aria-label", `${String.fromCharCode(65 + i)}. ${option}`);
    input.addEventListener("change", () => { state.answers[state.index] = i; persist(); renderNav(); updateProgress(); });
    const letter = document.createElement("span"); letter.className = "grid size-7 shrink-0 place-items-center rounded-lg bg-paper text-xs font-extrabold text-muted"; letter.textContent = String.fromCharCode(65 + i);
    const text = document.createElement("span"); text.className = "pt-0.5 text-sm font-medium leading-6"; text.textContent = option; label.append(input, letter, text); options.append(label);
  });
  renderNav(); updateProgress();
}

function renderNav() {
  const nav = $("question-nav"); nav.replaceChildren();
  questions.forEach((_, i) => {
    const button = document.createElement("button"); button.type = "button"; button.className = "question-dot relative grid aspect-square place-items-center rounded-lg border border-line text-xs font-bold hover:border-teal"; button.textContent = String(i + 1);
    button.setAttribute("aria-label", `Question ${i + 1}${state.answers[i] === undefined ? ", unanswered" : ", answered"}${state.flagged.includes(i) ? ", marked for review" : ""}`);
    if (i === state.index) button.setAttribute("aria-current", "step"); button.dataset.answered = String(state.answers[i] !== undefined); button.dataset.flagged = String(state.flagged.includes(i)); button.addEventListener("click", () => goTo(i)); nav.append(button);
  });
}

function updateProgress() {
  const count = Object.keys(state.answers).length; $("answered-count").textContent = String(count); $("progress-meter").style.width = `${count / questions.length * 100}%`; $("progress-meter").parentElement.setAttribute("aria-valuenow", String(count));
}
function goTo(index) { state.index = Math.max(0, Math.min(questions.length - 1, index)); persist(); renderQuestion(); $("question-text").focus({ preventScroll: true }); }
$("previous-button").addEventListener("click", () => goTo(state.index - 1));
$("next-button").addEventListener("click", () => goTo(state.index + 1));
$("flag-button").addEventListener("click", () => { state.flagged = state.flagged.includes(state.index) ? state.flagged.filter((i) => i !== state.index) : [...state.flagged, state.index]; persist(); renderQuestion(); });
$("hint-button").addEventListener("click", () => { const open = $("hint-button").getAttribute("aria-expanded") === "true"; $("hint-button").setAttribute("aria-expanded", String(!open)); $("hint-button").textContent = open ? "Show hint" : "Hide hint"; $("hint-text").classList.toggle("hidden", open); });
$("submit-button").addEventListener("click", () => {
  const unanswered = questions.length - Object.keys(state.answers).length;
  if (unanswered && !confirm(`You have ${unanswered} unanswered questions. Finish the exam?`)) return;
  const score = questions.reduce((sum, q, i) => sum + (state.answers[i] === q.answer ? 1 : 0), 0);
  const byDomain = Object.fromEntries(domains.map((domain) => { const group = questions.map((q, i) => ({ q, i })).filter(({ q }) => q.skill === domain); return [domain, { correct: group.filter(({ q, i }) => state.answers[i] === q.answer).length, total: group.length }]; }));
  $("result-score").textContent = `${score}/${questions.length}`; $("result-percent").textContent = `${Math.round(score / questions.length * 100)}% raw practice score`;
  const stats = $("skill-results"); stats.replaceChildren();
  domains.forEach((domain) => { const s = byDomain[domain]; const card = document.createElement("article"); card.className = "rounded-xl border border-line p-4"; const title = document.createElement("div"); title.className = "flex justify-between gap-2 text-sm font-bold"; const name = document.createElement("span"); name.textContent = domain; const val = document.createElement("span"); val.textContent = `${s.correct}/${s.total}`; title.append(name, val); const track = document.createElement("div"); track.className = "mt-3 h-2 overflow-hidden rounded-full bg-paper"; const fill = document.createElement("div"); fill.className = "h-full rounded-full bg-teal"; fill.style.width = `${s.correct / s.total * 100}%`; track.append(fill); card.append(title, track); stats.append(card); });
  const review = $("answer-review"); review.replaceChildren(); questions.forEach((q, i) => { const item = document.createElement("details"); item.className = "rounded-xl border border-line p-4"; const summary = document.createElement("summary"); summary.className = "cursor-pointer font-semibold leading-6"; summary.textContent = `${String(i + 1).padStart(2, "0")}. ${state.answers[i] === q.answer ? "Correct" : "Review"} · ${q.skill} · ${q.question}`; const body = document.createElement("div"); body.className = "mt-4 space-y-2 text-sm leading-6 text-muted"; const chosen = document.createElement("p"); chosen.textContent = `Your answer: ${state.answers[i] === undefined ? "Not answered" : `${String.fromCharCode(65 + state.answers[i])}. ${q.options[state.answers[i]]}`}`; const correct = document.createElement("p"); correct.className = "font-semibold text-ink"; correct.textContent = `Correct answer: ${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}`; const explanation = document.createElement("p"); explanation.textContent = q.explanation; body.append(chosen, correct, explanation); item.append(summary, body); review.append(item); });
  localStorage.removeItem(STORAGE_KEY); showView("results");
});
$("retake-button").addEventListener("click", () => startExam(true));

function renderDomains() {
  const root = $("domain-content"); if (root.childElementCount) return; root.replaceChildren();
  domains.forEach((domain) => { const section = document.createElement("section"); section.className = "rounded-2xl border border-line bg-white p-5 sm:p-7"; const title = document.createElement("h2"); title.className = "text-xl font-extrabold"; title.textContent = domain; section.append(title); const list = document.createElement("div"); list.className = "mt-5 space-y-3"; questions.filter((q) => q.skill === domain).forEach((q, idx) => { const details = document.createElement("details"); details.className = "rounded-xl border border-line p-4"; const summary = document.createElement("summary"); summary.className = "cursor-pointer font-semibold leading-6"; summary.textContent = `${String(idx + 1).padStart(2, "0")}. ${q.question}`; const body = document.createElement("div"); body.className = "mt-3 text-sm leading-6 text-muted"; const choices = document.createElement("ol"); choices.className = "list-[upper-alpha] space-y-1 pl-5"; q.options.forEach((o, i) => { const li = document.createElement("li"); li.textContent = `${o}${i === q.answer ? " ✓" : ""}`; if (i === q.answer) li.className = "font-bold text-teal-dark"; choices.append(li); }); const explanation = document.createElement("p"); explanation.className = "mt-3"; explanation.textContent = q.explanation; body.append(choices, explanation); details.append(summary, body); list.append(details); }); section.append(list); root.append(section); });
}

function renderResources() {
  const root = $("resource-content"); if (root.childElementCount) return; root.replaceChildren();
  const resources = [{ title: "Full CISSP study resource index", href: "./resources/README.md", desc: "Reference books, courses, practice tests, communities, exam guidance, and the original study approach." }, ...domains.map((d, i) => ({ title: d, href: `./resources/CISSP-Domain-${i + 1}-2024+Objectives.md`, desc: "Current 2024 objective-aligned study guide included in the supplied resource folder." })), ...domains.map((d, i) => ({ title: `${d} · Archived objectives`, href: `./resources/obj-archive/CISSP-Domain-${i + 1}-Objectives.md`, desc: "Archived objective-aligned guide retained from the supplied folder." })), { title: "Resource license", href: "./resources/LICENSE", desc: "License supplied with the study resources." }, { title: "Site configuration", href: "./resources/_config.yml", desc: "Configuration file supplied with the source resources." }];
  resources.forEach((r) => { const a = document.createElement("a"); a.href = r.href; a.target = "_blank"; a.rel = "noreferrer"; a.className = "rounded-2xl border border-line bg-white p-5 hover:border-teal"; const h = document.createElement("h2"); h.className = "font-bold text-teal-dark"; h.textContent = r.title; const p = document.createElement("p"); p.className = "mt-2 text-sm leading-6 text-muted"; p.textContent = r.desc; a.append(h, p); root.append(a); });
}

function renderCard() {
  const q = questions[state.card]; $("card-domain").textContent = q.skill; $("card-counter").textContent = `Card ${state.card + 1} of ${questions.length}`; $("card-question").textContent = q.question;
  $("card-answer").textContent = `Answer: ${q.options[q.answer]}. ${q.explanation}`; $("card-answer").classList.add("hidden"); $("reveal-card").textContent = "Show answer";
}
$("reveal-card").addEventListener("click", () => { const hidden = $("card-answer").classList.toggle("hidden"); $("reveal-card").textContent = hidden ? "Show answer" : "Hide answer"; });
$("prev-card").addEventListener("click", () => { state.card = (state.card + questions.length - 1) % questions.length; renderCard(); });
$("next-card").addEventListener("click", () => { state.card = (state.card + 1) % questions.length; renderCard(); });

if (questions.length !== 80 || domains.some((domain) => questions.filter((q) => q.skill === domain).length !== 10)) throw new Error("CISSP question bank must contain 10 questions for each of eight domains.");
const initialView = location.hash.slice(1); showView(["home", "exam", "domains", "resources", "flashcards", "results"].includes(initialView) ? initialView : "home");
if (initialView === "exam") startExam(false);
