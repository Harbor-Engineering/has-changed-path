import exec from '@actions/exec';

async function main(pathsToSearch = ''): Promise<boolean> {
  throwsForInvalidPaths(pathsToSearch);

  return hasChanged(pathsToSearch);
}

function throwsForInvalidPaths(pathsToSearch: string): void {
  if (pathsToSearch && typeof pathsToSearch === 'string') return;
  throw new Error('pathsToSearch needs to be a string');
}

function getCWD(): string {
  const { GITHUB_WORKSPACE = '.', SOURCE = '.' } = process.env;
  return `${GITHUB_WORKSPACE}/${SOURCE}`;
}

async function hasChanged(pathsToSearch: string): Promise<boolean> {
  const paths = pathsToSearch.split(' ');

  //  --quiet: exits with 1 if there were differences (https://git-scm.com/docs/git-diff)
  const exitCode = await exec.exec(
    'git',
    ['diff', '--quiet', 'HEAD~1', 'HEAD', '--', ...paths],
    {
      ignoreReturnCode: true,
      silent: false,
      cwd: getCWD(),
    },
  );

  const pathsChanged = exitCode === 1;

  return pathsChanged;
}

export default main;
