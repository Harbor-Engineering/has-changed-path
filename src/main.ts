import core from '@actions/core';
import hasChanged from './hasChanged';

async function run(): Promise<void> {
  try {
    const paths = core.getInput('paths', { required: true });
    const changed = await hasChanged(paths);

    if (changed) {
      core.info(`Code in the following paths changed: ${paths}`);
    } else {
      core.info(`Code in the following paths hasn't changed: ${paths}`);
    }

    core.setOutput('changed', changed);
  } catch (error) {
    core.setFailed(error as Error);
  }
}

run();
