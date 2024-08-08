
# Sync Bit lane with Git branch
When a lane is created or modified in **bit.cloud** sync the changes with the respective Git branch.

# GitHub Actions

This task synchronize updates to a Bit lane with its respective Git Branch. As the next step in your pipeline.

## Inputs

### `ws-dir`

**Optional** The workspace directory path from the root. Default `"Dir specified in Init Task or ./"`.

### `lane-name`

**Required** The source Bit lane name where the updates are fetched from.

### `branch-name`

**Optional** The destination Bit branch name where the component updates are sync to. Default `lane-name`.

### `skip-push`

**Optional** Skip push for testing purposes.

### `skip-ci`

**Optional** The Git commit message includes `[skip-ci]` to disable subsequent CI triggers as a result of the file modifications. Use `skip-ci: 'false'` to remove it.

## Example usage

**Note:** Use `bit-task/init@v2` a a prior step in your pipeline before running `bit-tasks/lane-branch@v1`. You can also receive the `lane-name` as an input parameter from GitHub Actions as shown below.

```yaml
name: Test Bit Lane Branch
on:
  workflow_dispatch:
    inputs:
      lane_name:
        description: 'The name of the lane to sync from'
        required: true
        default: 'main'
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
      - name: Initialize Bit
        uses: bit-tasks/init@v2
        with:
          ws-dir: '<WORKSPACE_DIR_PATH>'
      - name: Bit Lane Branch
        uses: bit-tasks/lane-branch@v1
        with:
          lane-name: ${{ github.event.inputs.lane_name }}
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
