# CISSP Study Hub website

Static CISSP study site with eight exam-ready domain guides. Each guide includes objective notes, interactive flip cards, all source review questions mapped to its domain, score reporting, answer rationales, and a domain-specific glossary. The supplied notes contain 420 review questions across 21 chapter sets; the domain totals are 100, 20, 80, 40, 40, 20, 80, and 40.

## Run locally

```sh
npm ci
npm run verify:questions
npm run build
npm run dev
```

Exam progress is saved to browser local storage. The bundled `public/resources` folder contains all files from the supplied CISSP study resource directory.
