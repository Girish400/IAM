import assert from "node:assert/strict";
import { questions } from "./questions.js";

const expectedCounts = {
  "User identities": 12,
  "Authentication & access": 14,
  "Workload identities": 12,
  "Identity governance": 12
};

assert.equal(questions.length, 50, "exam must contain exactly 50 questions");
const counts = Object.fromEntries(Object.keys(expectedCounts).map((skill) => [skill, 0]));
const prompts = new Set();

for (const [index, item] of questions.entries()) {
  assert.ok(item.question.trim(), `question ${index + 1} must have a prompt`);
  assert.ok(Object.hasOwn(counts, item.skill), `question ${index + 1} has an unexpected skill label`);
  assert.equal(item.options.length, 4, `question ${index + 1} must have four choices`);
  assert.equal(new Set(item.options).size, 4, `question ${index + 1} choices must be distinct`);
  assert.ok(Number.isInteger(item.answer) && item.answer >= 0 && item.answer < 4, `question ${index + 1} must have a valid answer index`);
  assert.ok(item.explanation.trim(), `question ${index + 1} must explain the answer`);
  assert.ok(!prompts.has(item.question), `question ${index + 1} duplicates another prompt`);
  prompts.add(item.question);
  counts[item.skill] += 1;
}

assert.deepEqual(counts, expectedCounts, "question distribution must match the published study guide weights");
console.log(`Verified ${questions.length} questions across ${Object.keys(counts).length} skills: ${JSON.stringify(counts)}`);
