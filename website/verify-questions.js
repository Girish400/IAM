import assert from "node:assert/strict";
import { questions, domains } from "./questions.js";

assert.equal(domains.length, 8, "the CISSP bank must define eight domains");
assert.equal(questions.length, 80, "the exam must contain exactly 80 questions");
const counts = Object.fromEntries(domains.map((domain) => [domain, 0]));
const prompts = new Set();
for (const [index, q] of questions.entries()) {
  assert.ok(q.question.trim(), `question ${index + 1} needs a prompt`);
  assert.ok(Object.hasOwn(counts, q.skill), `question ${index + 1} has an unexpected domain`);
  assert.equal(q.options.length, 4, `question ${index + 1} needs four options`);
  assert.equal(new Set(q.options).size, 4, `question ${index + 1} options must be distinct`);
  assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4, `question ${index + 1} answer index is invalid`);
  assert.ok(q.explanation.trim(), `question ${index + 1} needs an explanation`);
  assert.ok(q.hint.trim(), `question ${index + 1} needs a hint`);
  assert.ok(!prompts.has(q.question), `question ${index + 1} duplicates another prompt`);
  prompts.add(q.question); counts[q.skill] += 1;
}
for (const [domain, count] of Object.entries(counts)) assert.equal(count, 10, `${domain} must have exactly 10 questions`);
console.log(`Verified ${questions.length} questions across ${domains.length} domains: ${JSON.stringify(counts)}`);
