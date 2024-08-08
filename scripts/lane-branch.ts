import { exec } from "@actions/exec";

const run = async (
  skipPush: boolean,
  skipCI: boolean,
  laneName: string,
  branchName: string,
  gitUserName: string,
  gitUserEmail: string,
  wsdir: string
) => {

  await exec("bit status --strict", [], { cwd: wsdir });

  await exec(`bit lane import ${laneName}`, [], { cwd: wsdir });

  // Remove snap hashes and lane details from .Bitmap
  await exec("bit init --reset-lane-new", [], { cwd: wsdir });

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
      `git commit -m "Commiting the latest updates from lane: ${laneName} to the Git branch (automated)${ skipCI ? ` [skip-ci]` : ''}"`,
      [],
      { cwd: wsdir }
    );
  } catch (error) {
    console.error(`Error while committing changes`);
  }

  if (!skipPush) {
    await exec(`git push origin "${branchName}"`, [], { cwd: wsdir });
  }
};

export default run;
