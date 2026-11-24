# CISSP Study Hub website

Static study site with an 80-question practice exam (10 per CISSP domain), domain review pages, supplied study resources, and 80 answer flash cards.

## Run locally

```sh
npm ci
npm run verify:questions
npm run build
npm run dev
```

Exam progress is saved to browser local storage. The bundled `public/resources` folder contains all files from the supplied CISSP study resource directory.
