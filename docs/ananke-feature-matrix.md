# Ananke feature matrix

Use this matrix to track which Ananke features have runnable examples, fixtures, and verification steps in this repository.

| Feature area | Example path | Fixture path | Verification | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Home page | `content/_index.md` | `fixtures/content/home/` | `npm run check` | draft | Baseline page exists. |
| Regular pages | `content/pages/` | `fixtures/content/pages/` | `npm run check` | planned | Add representative page fixtures. |
| Posts | `content/posts/` | `fixtures/content/posts/` | `npm run check` | planned | Add front matter coverage. |
| Menus | `config/_default/menus.*` | `fixtures/menus/` | `npm run check` | planned | Add main and footer menu cases. |
| Taxonomies | `content/tags/` | `fixtures/taxonomies/` | `npm run check` | planned | Add tags and categories. |
| Images | `assets/` and `static/` | `fixtures/images/` | `npm run check` | planned | Add cover, featured, and inline image cases. |
| i18n | `content/*.de.md` | `fixtures/i18n/` | `npm run check` | planned | Add multilingual fixtures. |
| Render hooks | `content/tests/renderhooks/` | `fixtures/renderhooks/` | `npm run check` | planned | Add links, images, and headings. |
| Shortcodes | `content/tests/shortcodes/` | `fixtures/shortcodes/` | `npm run check` | planned | Add shortcode coverage. |
| Social links | `config/_default/params.*` | `fixtures/social/` | `npm run check` | planned | Add social configuration examples. |
