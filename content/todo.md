---
title: "Todo"
description: "Next steps for the Ananke Asylum public-domain literature content branch."
menu:
  main:
    weight: 40
---

## Next steps

* Run `npm run content:import` locally and commit the generated full-text pages.
* Run `hugo mod get github.com/gohugo-ananke/ananke` to resolve the active Ananke module version.
* Run `hugo mod tidy` after the first successful module build.
* Run `npm run check` and verify that all generated content builds without warnings.
* Review generated chapter boundaries for *The King in Yellow* and adjust title markers if Project Gutenberg changes the source formatting.
* Add front matter images or representative placeholders for list-card testing.
* Add custom summaries for each chapter to test Ananke list-page excerpts.
* Add more taxonomy pages for motifs such as `madness`, `confinement`, `unreliable-narrator`, `forbidden-book`, and `weird-fiction`.
* Add fixture pages that intentionally stress theme behaviour: very long paragraphs, nested blockquotes, poetry, epigraphs, footnotes, and image-heavy content.
* Add regression notes that map fixture pages to Ananke issues or feature checks.
* Decide whether generated public-domain full texts should be committed, or generated during CI from canonical sources.
