
# Sync Bit lane with Git branch
When a lane is created or modified in **bit.cloud** sync the changes with the respective Git branch.

# GitHub Actions

This task synchronize updates to a Bit lane with its respective Git Branch. As the next step in your pipeline.

## Inputs

### `ws-dir`

**Optional** The workspace directory path from the root. Default `"Dir specified in Init Task or ./"`.

### `lane`

**Optional** The source Bit lane name where the updates are fetched from. Default `"main"` lane.

### `skip-push`

**Optional** Skip push for testing purposes.

## Example usage

**Note:** Use `actions/checkout@v3` and `bit-task/init@v1` as prior steps in your pipeline before running `bit-tasks/lane-branch@v1`.

```yaml
name: Test Bit Lane Branch
on:
  push:
    branches-ignore:
      - main # or your default branch
permissions:
  contents: write
jobs:
  build:
    runs-on: ubuntu-latest
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      GIT_USER_NAME: ${{ secrets.GIT_USER_NAME }}
      GIT_USER_EMAIL: ${{ secrets.GIT_USER_EMAIL }}
      BIT_CONFIG_ACCESS_TOKEN: ${{ secrets.BIT_CONFIG_ACCESS_TOKEN }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Initialize Bit
        uses: bit-tasks/init@v1
        with:
          ws-dir: '<WORKSPACE_DIR_PATH>'
      - name: Bit Lane Branch
        uses: bit-tasks/lane-branch@v1
```

# Contributor Guide

Steps to create custom tasks in different CI/CD platforms.

## GitHub Actions

Go to the GithHub action task directory and build using NCC compiler. For example;

```
npm install
npm run build
git commit -m "Update task"
git tag -a -m "action release" v1 --force
git push --follow-tags
```

For more information, refer to [Create a javascript action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)
# lane-branch
# lane-branch
