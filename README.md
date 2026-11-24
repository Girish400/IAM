# CISSP Study Hub

> **[Open the CISSP study website](https://girish400.github.io/IAM/)** · 80 original multiple-choice questions (10 per domain), domain reviews, study resources, and flash cards.

This repository contains an independent CISSP study website and the supplied study resources. The practice questions are original study material and are not official (ISC)² exam items.

## Website

- [Take the practice exam](https://girish400.github.io/IAM/)
- Browse all eight CISSP domains, their ten questions and answers, and explanations.
- Study with 80 question-and-answer flash cards.
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
