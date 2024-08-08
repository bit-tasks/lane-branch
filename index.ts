import * as core from "@actions/core";
import run from "./scripts/lane-branch";

try {
  const wsDir: string = core.getInput("ws-dir") || process.env.WSDIR || "./";
  const lane = process.env.LANE || "";
  const branch: string = core.getInput("branch-name") || lane || process.env.GITHUB_REF?.split("/").slice(-1)[0] || 'main';
  const skipPush: boolean =
    core.getInput("skip-push") === "true" ? true : false;
  const skipCI: boolean = core.getInput("skip-ci") === "false" ? false : true;

  if (!lane) {
    throw new Error('"lane" parameter is not defined in "bit-tasks/init@v2" task');
  }

  if (lane === "main") {
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

  run(skipPush, skipCI, lane, branch, gitUserName, gitUserEmail, wsDir);
} catch (error) {
  core.setFailed((error as Error).message);
}
