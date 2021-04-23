import { colorLog, loggingLevel } from './color-log';
import runProcess from './run-process';

function runLernaProcess(answers, args: string[]) {
    const lernaArgs = args.slice(3);
    const scopeArgs = answers.name.map((appName: string) => ['--scope', appName]).flat();

    colorLog(`Run lerna ${lernaArgs.concat(scopeArgs).join(' ')}`, loggingLevel.success);
    runProcess('lerna', [...lernaArgs, ...scopeArgs]);
    return 0;
}

export default runLernaProcess;
