# SC-300 practice exam website

This static site provides 50 original multiple-choice questions aligned with the current [Microsoft SC-300 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-300#skills-at-a-glance). It uses semantic HTML, modern browser JavaScript modules, responsive CSS, and Tailwind CSS 4.

## Run locally

```sh
npm ci
npm run build
npm run dev
```

The site is static after the Tailwind build. Serve this folder with any local static web server. GitHub Pages deployment is defined in `.github/workflows/pages.yml` at the repository root.

## Attempts and score history

In-progress answers and up to 100 completed score summaries are stored in the taker's browser with `localStorage`. No account or personal information is collected. Results can be exported as CSV and manually saved in the repository's `exam/` folder. A static GitHub Pages site cannot write visitor results back to the shared repository.

The exam is untimed; the suggested 60-minute duration is a study guideline. Practice percentages are raw scores and do not predict Microsoft's official scaled score.
