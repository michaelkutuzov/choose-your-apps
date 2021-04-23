export enum loggingLevel {
    success = 'success',
    warning = 'warning',
    error = 'error',
    info = 'info',
}

const background = '\x1b[40m'; // black
const resetTerminalColor = '\x1b[0m';
export const GREEN = `${background}\x1b[32m%s${resetTerminalColor}`;
export const YELLOW = `${background}\x1b[33m%s${resetTerminalColor}`;
export const RED = `${background}\x1b[31m%s${resetTerminalColor}`;
export const BLUE = `${background}\x1b[34m%s${resetTerminalColor}`;
/**
 * See https://gist.github.com/abritinthebay/d80eb99b2726c83feb0d97eab95206c4
 * for the list of color codes
 */

export function colorLog(message: string, logLevel: loggingLevel = loggingLevel.info): void {
    switch (logLevel) {
        case 'warning':
            console.warn(YELLOW, message);
            return;
        case 'error':
            console.error(RED, message);
            return;
        case 'success':
            console.log(GREEN, message);
            return;
        default:
            console.log(BLUE, message);
            return;
    }
}
