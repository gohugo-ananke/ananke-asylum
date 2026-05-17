# Ananke Asylum

Ananke Asylum is the GoHugo Ananke-specific repository in the Asylum system.

It collects runnable test cases, regression examples, support reproductions, fixtures, and documentation for the Ananke theme.

## Asylum repositories

The Asylum system is intentionally split across multiple repositories. Each repository shares the same workflow, branch model, and documentation structure while keeping its ecosystem-specific implementation details.

Current Asylum repositories:

* Hugo Asylum: <https://github.com/davidsneighbour/hugo-asylum>
* Tailwind Asylum: <https://github.com/davidsneighbour/tailwind-asylum>
* Ananke Asylum: <https://github.com/gohugo-ananke/ananke-asylum>

## Purpose

Use this repository to:

* reproduce Ananke issues
* document Ananke behaviours
* test GoHugo content, layouts, menus, taxonomies, images, and i18n with Ananke
* create stable examples for support and documentation
* verify fixes before they are proposed upstream

## Public-domain literature fixture content

This branch adds an initial public-domain literature corpus for theme development:

* Robert W. Chambers, *The King in Yellow*
* Charlotte Perkins Gilman, *The Yellow Wallpaper*

The content structure includes books, case files, authors, source records, taxonomies, and a todo page. The full text pages are generated from Project Gutenberg source files so the corpus can be refreshed from canonical public-domain sources.

Generate the full text content:

```bash
npm run content:import
```

## Commands

Install dependencies:

```bash
npm install
```

Run a production-style build:

```bash
npm run build
```

Run the verification check:

```bash
npm run check
```

Start a local server:

```bash
npm run server
```

## Documentation

* `ASYLUM.md` describes the shared Asylum model.
* `docs/branch-workflow.md` describes branch naming and lifecycle.
* `docs/testcase-workflow.md` describes how to create reproducible cases.
* `docs/ananke-feature-matrix.md` tracks Ananke features and related examples.
* `docs/upstream-issue-workflow.md` describes how to turn upstream issues into test cases.
