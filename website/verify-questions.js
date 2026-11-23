import assert from "node:assert/strict";
import { questions } from "./questions.js";

const expectedCounts = {
  "User identities": 62,
  "Authentication & access": 64,
  "Workload identities": 62,
  "Identity governance": 62
};

assert.equal(questions.length, 250, "exam must contain exactly 250 questions");
const counts = Object.fromEntries(Object.keys(expectedCounts).map((skill) => [skill, 0]));
const prompts = new Set();

for (const [index, item] of questions.entries()) {
  assert.ok(item.question.trim(), `question ${index + 1} must have a prompt`);
  assert.ok(Object.hasOwn(counts, item.skill), `question ${index + 1} has an unexpected skill label`);
  assert.equal(item.options.length, 4, `question ${index + 1} must have four choices`);
  assert.equal(new Set(item.options).size, 4, `question ${index + 1} choices must be distinct`);
  assert.ok(Number.isInteger(item.answer) && item.answer >= 0 && item.answer < 4, `question ${index + 1} must have a valid answer index`);
  assert.ok(item.explanation.trim(), `question ${index + 1} must explain the answer`);
  assert.ok(item.hint.trim(), `question ${index + 1} must have a hint`);
  assert.ok(item.hint !== item.options[item.answer], `question ${index + 1} hint must not reveal the answer verbatim`);
  assert.ok(!prompts.has(item.question), `question ${index + 1} duplicates another prompt`);
  prompts.add(item.question);
  counts[item.skill] += 1;
}

assert.deepEqual(counts, expectedCounts, "question distribution must match the published study guide weights");
console.log(`Verified ${questions.length} questions across ${Object.keys(counts).length} skills: ${JSON.stringify(counts)}`);
