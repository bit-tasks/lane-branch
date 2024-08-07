import * as core from "@actions/core";
import run from "./scripts/lane-branch";

try {
  const wsDir: string = core.getInput("ws-dir") || process.env.WSDIR || "./";
  const laneName: string = core.getInput("lane-name") || "main";
  const skipPush: boolean =
    core.getInput("skip-push") === "true" ? true : false;

  if (!laneName) {
    throw new Error("Lane name is not found");
  }

  const gitUserName = process.env.GIT_USER_NAME;
  if (!gitUserName) {
    throw new Error("Git user name not found");
  }

  const gitUserEmail = process.env.GIT_USER_EMAIL;
  if (!gitUserEmail) {
    throw new Error("Git user email token not found");
  }

  run(skipPush, laneName, gitUserName, gitUserEmail, wsDir);
} catch (error) {
  core.setFailed((error as Error).message);
}
