# Introduction

### Style

We'll be following the [AirBnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)

### Branching

We'll be working off of the `main` branch. For each task, you'll create a branch off of the `main` branch and do all of your work there. Your branch should be named something distinct that makes it easy to determine what task it's associated with (e.g. `events-tile`). When you're done, you'll create a pull request in GitHub to merge your branch back into `main`.

### Commit Changes

When you're ready to save your current changes, create a local commit.

  1. The first `-m` option specifies the commit **title** (short message).
  2. The second `-m` option specifies the commit **body** (detailed explanation).
  3. The third `-m` option specifies the **footer** (additional information such as references to issues, ticket numbers, etc.).

In your feature branch, run:

```sh
git add -A
git commit -m "short commit message under 72 chars" -m "detailed explanation of the changes made." -m "related issue #__"
```
### Commit Message Guidelines

A properly formed Git commit message should always be able to complete the following sentence: → If applied, this commit will _*your subject line here*_

Use the following [semantic](https://www.conventionalcommits.org/) prefixes for commit messages:

- **Feat**: A new feature for the user
- **Fix**: Resolution of any bug that restores expected functionality
- **Build**: Changes affecting the build system or external dependencies (e.g., webpack, npm packages)
- **Refactor**: Refactoring production code (e.g., renaming a variable) that improves readability or structure
- **Chore**: Updating tasks, build processes, or dependencies (no production code change)
- **Test**: Adding or refactoring tests (no production code change)
- **Perf**: Code changes that improve performance
- **Style**: Formatting changes (no production code change)
- **Docs**: Changes to the documentation
- **Revert**: Undo or roll back previous changes

#### Commit Examples

```git
feat: add user auth validation
chore: fix typo in validation function
build: improve webpack config
refactor: update error handling in API call
chore: update npm packages
test: add test for calculateTotal function
perf: optimize image loading for homepage
style: standardize formatting in CSS file
docs: update API documentation for login
revert: revert cross-team edits to routes.js
```