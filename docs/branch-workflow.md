# Branch workflow

## Create a new test branch

Use this naming pattern:

```text
<prefix>/<id-or-topic>
```

Examples:

```text
bug/gh-123-menu-rendering
discourse/52831-taxonomy-output
support/customer-theme-switcher
howto/ananke-social-links
theme/ananke-baseline
test/i18n-baseline
test/renderhook-baseline
```

## Workflow

1. Update `main`.
2. Create the new branch from `main`.
3. Add only the files required for the case.
4. Add or update the case documentation.
5. Run the verification commands.
6. Keep notes in the branch or linked issue.
7. Open a PR only when something should return to `main`.

## Merge rule

Only merge reusable work into `main`.

A messy reproduction branch can stay unmerged if it is still valuable as a historical debugging branch.
