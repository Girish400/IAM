import { questions } from "./questions.js";

const STORAGE_KEY = "iam-sc300-practice-v1";
const HISTORY_KEY = "iam-sc300-score-history-v1";
const SKILL_ORDER = ["User identities", "Authentication & access", "Workload identities", "Identity governance"];
const state = { index: 0, answers: {}, flagged: [], startedAt: null, completed: false, result: null };
const $ = (id) => document.getElementById(id);
const sections = { welcome: $("welcome"), exam: $("exam"), results: $("results") };

function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ index: state.index, answers: state.answers, flagged: state.flagged, startedAt: state.startedAt }));
    $("saved-state").textContent = "Saved on this device";
  } catch {
    $("saved-state").textContent = "Browser storage unavailable";
  }
}

function validSavedAttempt(saved) {
  return saved && saved.answers && typeof saved.answers === "object" && Number.isInteger(saved.index) && saved.index >= 0 && saved.index < questions.length;
}

function setSection(name) {
  for (const [key, element] of Object.entries(sections)) element.classList.toggle("hidden", key !== name);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startExam(fresh = false) {
  const saved = readJSON(STORAGE_KEY, null);
  if (!fresh && validSavedAttempt(saved)) {
    state.index = saved.index;
    state.answers = saved.answers;
    state.flagged = Array.isArray(saved.flagged) ? saved.flagged : [];
    state.startedAt = saved.startedAt || new Date().toISOString();
  } else {
    state.index = 0;
    state.answers = {};
    state.flagged = [];
    state.startedAt = new Date().toISOString();
  }
  state.completed = false;
  state.result = null;
  setSection("exam");
  renderQuestion();
  $("question-text").focus({ preventScroll: true });
}

function renderQuestion() {
  const question = questions[state.index];
  $("question-skill").textContent = question.skill;
  $("question-number").textContent = `QUESTION ${String(state.index + 1).padStart(2, "0")} / ${questions.length}`;
  $("question-text").textContent = question.question;
  const hint = $("hint-text");
  hint.textContent = question.hint;
  hint.classList.add("hidden");
  $("hint-button").setAttribute("aria-expanded", "false");
  $("hint-button").textContent = "Show hint";
  $("flag-button").setAttribute("aria-pressed", String(state.flagged.includes(state.index)));
  $("flag-button").textContent = state.flagged.includes(state.index) ? "★ Marked for review" : "☆ Mark for review";
  $("previous-button").disabled = state.index === 0;
  $("next-button").textContent = state.index === questions.length - 1 ? "Last question" : "Next →";

  const options = $("options");
  options.replaceChildren();
  question.options.forEach((option, optionIndex) => {
    const label = document.createElement("label");
    label.className = "option-card flex cursor-pointer items-start gap-3 rounded-xl border border-line px-4 py-4 hover:border-teal";
    const input = document.createElement("input");
    input.className = "mt-1 size-4 accent-teal";
    input.type = "radio";
    input.name = `question-${state.index}`;
    input.value = String(optionIndex);
    input.checked = state.answers[state.index] === optionIndex;
    input.setAttribute("aria-label", `${String.fromCharCode(65 + optionIndex)}. ${option}`);
    input.addEventListener("change", () => {
      state.answers[state.index] = optionIndex;
      saveProgress();
      renderQuestionNav();
      updateProgress();
    });
    const letter = document.createElement("span");
    letter.className = "grid size-7 shrink-0 place-items-center rounded-lg bg-paper text-xs font-extrabold text-muted";
    letter.textContent = String.fromCharCode(65 + optionIndex);
    const text = document.createElement("span");
    text.className = "pt-0.5 text-sm font-medium leading-6";
    text.textContent = option;
    label.append(input, letter, text);
    options.append(label);
  });
  renderQuestionNav();
  updateProgress();
}

function renderQuestionNav() {
  const nav = $("question-nav");
  nav.replaceChildren();
  questions.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "question-dot relative grid aspect-square place-items-center rounded-lg border border-line text-xs font-bold hover:border-teal";
    button.textContent = String(index + 1);
    button.setAttribute("aria-label", `Question ${index + 1}${state.answers[index] === undefined ? ", unanswered" : ", answered"}${state.flagged.includes(index) ? ", marked for review" : ""}`);
    if (index === state.index) button.setAttribute("aria-current", "step");
    button.dataset.answered = String(state.answers[index] !== undefined);
    button.dataset.flagged = String(state.flagged.includes(index));
    button.addEventListener("click", () => goTo(index));
    nav.append(button);
  });
}

function updateProgress() {
  const count = Object.keys(state.answers).length;
  $("answered-count").textContent = String(count);
  $("progress-meter").style.width = `${(count / questions.length) * 100}%`;
  $("progress-meter").parentElement.setAttribute("aria-valuenow", String(count));
}

function goTo(index) {
  state.index = Math.max(0, Math.min(questions.length - 1, index));
  saveProgress();
  renderQuestion();
  $("question-text").focus({ preventScroll: true });
}

function toggleFlag() {
  state.flagged = state.flagged.includes(state.index) ? state.flagged.filter((item) => item !== state.index) : [...state.flagged, state.index];
  saveProgress();
  renderQuestion();
}

function calculateResult(completedAt = new Date().toISOString()) {
  const correct = questions.reduce((sum, question, index) => sum + (state.answers[index] === question.answer ? 1 : 0), 0);
  const bySkill = Object.fromEntries(SKILL_ORDER.map((skill) => {
    const indices = questions.map((question, index) => question.skill === skill ? index : -1).filter((index) => index >= 0);
    const skillCorrect = indices.filter((index) => state.answers[index] === questions[index].answer).length;
    return [skill, { correct: skillCorrect, total: indices.length }];
  }));
  return { completedAt, score: correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100), bySkill, answers: { ...state.answers }, startedAt: state.startedAt };
}

function finishExam() {
  const unanswered = questions.length - Object.keys(state.answers).length;
  if (unanswered && !window.confirm(`You have ${unanswered} unanswered ${unanswered === 1 ? "question" : "questions"}. Unanswered questions count as incorrect. Finish the exam?`)) return;
  state.result = calculateResult();
  state.completed = true;
  const history = readJSON(HISTORY_KEY, []);
  const nextHistory = [...(Array.isArray(history) ? history : []), state.result].slice(-100);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
    localStorage.removeItem(STORAGE_KEY);
    $("storage-note").textContent = "Attempt saved in this browser. Download the CSV if you want a copy in the repository's exam folder.";
  } catch {
    $("storage-note").textContent = "Browser storage is unavailable. Download the CSV to keep this score.";
  }
  renderResults(state.result);
  setSection("results");
  $("results-title").focus({ preventScroll: true });
}

function renderResults(result) {
  $("result-score").textContent = `${result.score}/${result.total}`;
  $("result-percent").textContent = `${result.percentage}% raw practice score`;
  const skillResults = $("skill-results");
  skillResults.replaceChildren();
  for (const skill of SKILL_ORDER) {
    const score = result.bySkill[skill];
    const card = document.createElement("article");
    card.className = "rounded-xl border border-line p-4";
    const title = document.createElement("div");
    title.className = "flex items-center justify-between gap-2 text-sm font-bold";
    const name = document.createElement("span");
    name.textContent = skill;
    const total = document.createElement("span");
    total.textContent = `${score.correct}/${score.total}`;
    title.append(name, total);
    const track = document.createElement("div");
    track.className = "mt-3 h-2 overflow-hidden rounded-full bg-paper";
    const fill = document.createElement("div");
    fill.className = "h-full rounded-full bg-teal";
    fill.style.width = `${Math.round((score.correct / score.total) * 100)}%`;
    track.append(fill);
    card.append(title, track);
    skillResults.append(card);
  }
  const review = $("answer-review");
  review.replaceChildren();
  questions.forEach((question, index) => {
    const selected = result.answers[index];
    const isCorrect = selected === question.answer;
    const item = document.createElement("details");
    item.className = "rounded-xl border border-line p-4";
    const summary = document.createElement("summary");
    summary.className = "cursor-pointer font-semibold leading-6";
    summary.textContent = `${String(index + 1).padStart(2, "0")}. ${isCorrect ? "Correct" : "Review"} · ${question.skill} · ${question.question}`;
    const body = document.createElement("div");
    body.className = "mt-4 space-y-2 text-sm leading-6 text-muted";
    const chosen = document.createElement("p");
    chosen.textContent = `Your answer: ${selected === undefined ? "Not answered" : `${String.fromCharCode(65 + selected)}. ${question.options[selected]}`}`;
    const answer = document.createElement("p");
    answer.className = "font-semibold text-ink";
    answer.textContent = `Correct answer: ${String.fromCharCode(65 + question.answer)}. ${question.options[question.answer]}`;
    const explanation = document.createElement("p");
    explanation.textContent = question.explanation;
    body.append(chosen, answer, explanation);
    item.append(summary, body);
    review.append(item);
  });
}

function csvCell(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function downloadHistory() {
  const history = readJSON(HISTORY_KEY, []);
  const rows = [["completed_at", "score", "total", "percentage", "user_id", "auth_access", "workload_identities", "identity_governance"]];
  for (const attempt of Array.isArray(history) ? history : []) {
    rows.push([
      attempt.completedAt,
      attempt.score,
      attempt.total,
      attempt.percentage,
      `${attempt.bySkill[SKILL_ORDER[0]].correct}/${attempt.bySkill[SKILL_ORDER[0]].total}`,
      `${attempt.bySkill[SKILL_ORDER[1]].correct}/${attempt.bySkill[SKILL_ORDER[1]].total}`,
      `${attempt.bySkill[SKILL_ORDER[2]].correct}/${attempt.bySkill[SKILL_ORDER[2]].total}`,
      `${attempt.bySkill[SKILL_ORDER[3]].correct}/${attempt.bySkill[SKILL_ORDER[3]].total}`
    ]);
  }
  const csv = `${rows.map((row) => row.map(csvCell).join(",")).join("\r\n")}\r\n`;
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "sc-300-score-history.csv";
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

$("start-button").addEventListener("click", () => startExam());
$("previous-button").addEventListener("click", () => goTo(state.index - 1));
$("next-button").addEventListener("click", () => goTo(state.index + 1));
$("flag-button").addEventListener("click", toggleFlag);
$("hint-button").addEventListener("click", () => {
  const isExpanded = $("hint-button").getAttribute("aria-expanded") === "true";
  $("hint-button").setAttribute("aria-expanded", String(!isExpanded));
  $("hint-button").textContent = isExpanded ? "Show hint" : "Hide hint";
  $("hint-text").classList.toggle("hidden", isExpanded);
});
$("submit-button").addEventListener("click", finishExam);
$("download-score").addEventListener("click", downloadHistory);
$("retake-button").addEventListener("click", () => startExam(true));

if (questions.length !== 250 || questions.some((question) => question.options.length !== 4 || question.answer < 0 || question.answer > 3 || !question.hint?.trim())) {
  throw new Error("The practice exam question data is incomplete or invalid.");
}
if (validSavedAttempt(readJSON(STORAGE_KEY, null))) $("start-button").firstChild.textContent = "Resume saved practice exam ";
