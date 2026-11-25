"""Extract the supplied CISSP notes' chapter review questions and answer notes.

Run from website/: python scripts/extract-question-bank.py
The source CISSP_Notes.txt is deliberately read locally and is not copied into Pages.
"""
from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "CISSP_Notes.txt"
OUTPUT = ROOT / "website" / "public" / "resources" / "domain-question-bank.json"

CHAPTER_DOMAIN = {
    1: 1, 2: 1, 3: 1, 4: 1, 5: 2, 6: 3, 7: 3, 8: 3, 9: 3, 10: 7,
    11: 4, 12: 4, 13: 5, 14: 5, 15: 6, 16: 7, 17: 7, 18: 7, 19: 1,
    20: 8, 21: 8,
}

def normal_text(lines: list[str]) -> str:
    text = " ".join(line.strip() for line in lines if line.strip())
    text = re.sub(r"(?<=\w)-\s+(?=[a-z])", "", text)
    return re.sub(r"\s+", " ", text).strip()

def number_match(line: str):
    match = re.match(r"^\s*((?:1\s+)?\d{1,2})\.\s+(.+)$", line)
    if not match:
        return None
    return int(re.sub(r"\s+", "", match.group(1))), match.group(2).strip()

def extract_question_blocks(lines: list[str], start: int) -> list[dict]:
    questions: list[dict] = []
    current = None
    active_option = None
    expected = 1

    def finish():
        nonlocal current
        if not current:
            return
        current["question"] = normal_text(current.pop("prompt_lines"))
        current["options"] = [
            {"letter": letter, "text": normal_text(parts)}
            for letter, parts in current.pop("option_parts").items()
        ]
        if current["question"] and current["options"]:
            questions.append(current)
        current = None

    for line in lines[start + 1:]:
        numbered = number_match(line)
        if expected > 20 and numbered and numbered[0] == 1:
            finish()
            break
        if numbered and numbered[0] == expected:
            finish()
            if expected > 20:
                break
            current = {"number": expected, "prompt_lines": [numbered[1]], "option_parts": {}}
            active_option = None
            expected += 1
            continue
        if current is None:
            continue
        option = re.match(r"^\s*([A-Z])\.\s*(.*)$", line)
        if option:
            active_option = option.group(1)
            current["option_parts"].setdefault(active_option, []).append(option.group(2).strip())
        elif active_option:
            current["option_parts"][active_option].append(line.strip())
        elif line.strip() and not re.match(r"^\s*\d{1,4}\s+Chapter\s+\d+", line):
            current["prompt_lines"].append(line.strip())
    finish()
    return questions

def extract_answers(lines: list[str]) -> dict[tuple[int, int], dict]:
    markers = []
    for i, line in enumerate(lines):
        match = re.search(r"Chapter(?:Â)?\s*(\d+)\s*:", line)
        if match and 41150 < i < 43500:
            markers.append((i, int(match.group(1))))
    result: dict[tuple[int, int], dict] = {}
    chapters = sorted({chapter for _, chapter in markers})
    for chapter in chapters:
        starts = [index for index, number in markers if number == chapter]
        start = starts[0]
        expected = 1
        answer_rows = []
        current = None
        for line in lines[start + 1:]:
            match = re.match(r"^\s*((?:1\s+)?\d{1,2})\.\s*([A-Z](?:\s*,\s*[A-Z])*)\.\s*(.*)$", line)
            if match:
                number = int(re.sub(r"\s+", "", match.group(1)))
                if number == 1 and expected != 1:
                    break
                if number != expected:
                    continue
                if current:
                    answer_rows.append(current)
                current = {"number": number, "answer": re.findall(r"[A-Z]", match.group(2)), "rationale_lines": [match.group(3)]}
                expected += 1
                if expected > 20:
                    break
            elif current and line.strip() and not re.match(r"^\d{3,4}\s+Appendix", line):
                current["rationale_lines"].append(line.strip())
        if current:
            answer_rows.append(current)
        for row in answer_rows:
            row["rationale"] = normal_text(row.pop("rationale_lines"))
            result[(chapter, row["number"])] = row
    return result

def main():
    lines = SOURCE.read_text(encoding="utf-8", errors="replace").splitlines()
    markers = [i for i, line in enumerate(lines) if i > 3000 and re.fullmatch(r"\s*Review Questions\s*", line)]
    answers = extract_answers(lines)
    bank = {str(domain): [] for domain in range(1, 9)}
    errors = []
    for chapter, start in enumerate(markers, 1):
        questions = extract_question_blocks(lines, start)
        for q in questions:
            answer = answers.get((chapter, q["number"]))
            if not answer:
                errors.append(f"Chapter {chapter} question {q['number']}: missing answer")
                continue
            letters = {option["letter"] for option in q["options"]}
            if not set(answer["answer"]).issubset(letters):
                errors.append(f"Chapter {chapter} question {q['number']}: invalid answer {answer['answer']} vs {sorted(letters)}")
                continue
            if len(q["options"]) < 2:
                errors.append(f"Chapter {chapter} question {q['number']}: fewer than two options")
                continue
            bank[str(CHAPTER_DOMAIN[chapter])].append({
                "sourceChapter": chapter,
                "number": q["number"],
                "question": q["question"],
                "options": q["options"],
                "answer": answer["answer"],
                "multiple": len(answer["answer"]) > 1 or bool(re.search(r"choose all that apply|select all that apply", q["question"], re.I)),
                "explanation": answer["rationale"],
            })
    count = sum(map(len, bank.values()))
    per_domain = {domain: len(questions) for domain, questions in bank.items()}
    print(f"Review sections: {len(markers)}; aligned question/answer pairs: {count}; by domain: {per_domain}")
    if errors:
        print(f"Extraction errors: {len(errors)}")
        for error in errors[:30]:
            print(error)
        raise SystemExit(1)
    incomplete = {chapter: 20 for chapter in range(1, 22)}
    chapter_counts = Counter(q["sourceChapter"] for questions in bank.values() for q in questions)
    missing = {chapter: 20 - chapter_counts[chapter] for chapter in incomplete if chapter_counts[chapter] != 20}
    if missing:
        print("Incomplete chapter groups:", missing)
        raise SystemExit(1)
    OUTPUT.write_text(json.dumps({"source": "CISSP_Notes.txt", "total": count, "domains": bank}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUTPUT}")

if __name__ == "__main__":
    main()
