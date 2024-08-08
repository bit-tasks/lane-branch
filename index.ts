import * as core from "@actions/core";
import run from "./scripts/lane-branch";

try {
  const wsDir: string = core.getInput("ws-dir") || process.env.WSDIR || "./";
  const laneName = process.env.LANE_NAME;
  const branchName: string = core.getInput("branch-name") || laneName || process.env.GITHUB_REF?.split("/").slice(-1)[0] || 'main';
  const skipPush: boolean =
    core.getInput("skip-push") === "true" ? true : false;
  const skipCI: boolean = core.getInput("skip-ci") === "false" ? false : true;

  if (!process.env.LANE_NAME) {
    throw new Error("Lane is not found");
  }

  if (laneName === "main") {
    throw new Error('Specify a lane other than "main"!');
  }

  const gitUserName = process.env.GIT_USER_NAME;
  if (!gitUserName) {
    throw new Error("Git user name not found");
  }

  const gitUserEmail = process.env.GIT_USER_EMAIL;
  if (!gitUserEmail) {
    throw new Error("Git user email token not found");
  }

  run(skipPush, skipCI, laneName, branchName, gitUserName, gitUserEmail, wsDir);
} catch (error) {
  core.setFailed((error as Error).message);
}
