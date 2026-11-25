# CISSP Study Hub

> **[Open the CISSP study website](https://girish400.github.io/IAM/)** · Eight exam-ready domain study guides with objective notes, interactive flash cards, domain exams, scoring, explanations, and domain glossaries.

This repository contains an independent CISSP study website and the supplied study resources. Its domain exams include all 420 review questions found in the supplied `CISSP_Notes.txt`; the source contains 21 chapter sets of 20 questions each.

## Website

- [Take the practice exam](https://girish400.github.io/IAM/)
- Browse all eight CISSP domains, their ten questions and answers, and explanations.
- Study with 80 question-and-answer flash cards.
- Open any of the eight domain study guides from the landing page.
- Review objective notes, flip cards, take the domain's complete chapter-mapped exam, view the score, and review answer rationales.
- Review each domain's own key-term glossary at the end of its guide.
- Domain exam question totals are 100, 20, 80, 40, 40, 20, 80, and 40 for Domains 1–8 respectively.
- Access the supplied study guides, archived objectives, resource index, and license from Resources.

## Local development

```sh
cd website
npm ci
npm run verify:questions
npm run build
npm run dev
```

GitHub Pages deployment is configured in `.github/workflows/pages.yml`. Exam progress is stored locally in the browser; the static site does not collect personal information or write visitor results to the repository.
