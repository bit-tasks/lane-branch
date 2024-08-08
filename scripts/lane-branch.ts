import { exec } from "@actions/exec";
import * as core from "@actions/core";

const run = async (
  skipPush: boolean,
  skipCI: boolean,
  laneName: string,
  branchName: string,
  gitUserName: string,
  gitUserEmail: string,
  wsdir: string,
  args: string[]
) => {

  await exec("bit", ["import", ...args], {
    cwd: wsdir,
  });

  await exec("bit", ["lane", "import", `"${laneName}"`, "-x", ...args], {
    cwd: wsdir,
  });

  // Remove snap hashes and lane details from .Bitmap
  await exec("bit", ["init", "--reset-lane-new", ...args], { cwd: wsdir });

  // Git operations
  await exec(`git config --global user.name "${gitUserName}"`, [], {
    cwd: wsdir,
  });

  await exec(`git config --global user.email "${gitUserEmail}"`, [], {
    cwd: wsdir,
  });

  await exec(`git checkout -b ${branchName}`, [], {
    cwd: wsdir,
  });

  await exec("git add .", [], { cwd: wsdir });

  try {
    await exec(
      `git commit -m "Commiting the latest updates from lane: ${laneName} to the Git branch (automated)${
        skipCI ? ` [skip-ci]` : ""
      }"`,
      [],
      { cwd: wsdir }
    );
  } catch (error) {
    core.error(`Error while committing changes!`);
  }

  if (!skipPush) {
    await exec(`git push origin "${branchName}" -f`, [], { cwd: wsdir });
  } else {
    core.warning("WARNING - Skipped pushing to GitHub");
  }
};

export default run;
