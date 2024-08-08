import * as core from "@actions/core";
import run from "./scripts/lane-branch";

try {
  const wsDir: string = core.getInput("ws-dir") || process.env.WSDIR || "./";
  const laneName: string = core.getInput("lane-name");
  const branchName: string = core.getInput("branch-name");
  const skipPush: boolean =
    core.getInput("skip-push") === "true" ? true : false;
  const skipCI: boolean = core.getInput("skip-ci") === "false" ? false : true;

  if (!laneName) {
    throw new Error("Lane name is not found");
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
