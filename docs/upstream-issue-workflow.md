# Upstream issue workflow

Use this workflow when an Ananke issue, support request, or GoHugo Discourse thread should become a reproducible test case.

## Intake

Record:

* source type
* source URL
* issue or thread ID
* reported behaviour
* expected behaviour
* affected Ananke version or commit, when known
* affected GoHugo version, when known
* minimal reproduction notes

## Branch

Create a branch from `main` using one of these patterns:

```text
bug/gh-123-short-topic
discourse/52831-short-topic
support/source-id-short-topic
```

## Reproduction

1. Add the smallest content/configuration needed to reproduce the issue.
2. Add a test case page explaining the behaviour.
3. Add fixtures under `fixtures/` when reusable.
4. Add verification commands.
5. Run `npm run check`.

## Stabilisation

Before merging anything into `main`, clean up the branch:

* remove temporary logs
* remove local paths
* remove private data
* keep only reusable fixtures, examples, tests, and documentation
* document the final status

## Upstream link

When the test case supports an upstream issue or pull request, link back to the branch, fixture, or page from the upstream discussion.
