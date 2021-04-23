import { spawn } from 'child_process';
import { colorLog, loggingLevel } from './color-log';

function runProcess(processName: string, processArgs: string[]) {
    const lernaProcess = spawn('lerna', processArgs);

    lernaProcess.stderr.on('data', data => {
        colorLog(data.toString(), loggingLevel.error);
    });

    lernaProcess.stdout.on('data', data => {
        colorLog(data.toString(), loggingLevel.info);
    });
}

export default runProcess;
