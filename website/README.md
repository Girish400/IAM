# CISSP Study Hub website

Static study site with an 80-question practice exam (10 per CISSP domain), domain review pages, supplied study resources, and 80 answer flash cards. The Resources page also links a Domain 1 exam-ready guide covering every objective, a glossary, 40 flash cards, and 40 original multiple-choice questions with rationales.

## Run locally

```sh
npm ci
npm run verify:questions
npm run build
npm run dev
```

Exam progress is saved to browser local storage. The bundled `public/resources` folder contains all files from the supplied CISSP study resource directory.
