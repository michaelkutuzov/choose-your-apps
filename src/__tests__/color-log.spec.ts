import { colorLog, loggingLevel, RED, BLUE, GREEN, YELLOW } from '../color-log';

describe('colorLog - function to paint console output', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const TEST_MESSAGE = 'test message';

    it('should log message using console.log', () => {
        colorLog(TEST_MESSAGE);
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    });
    it('should log message using console.error if logLevel is error', () => {
        colorLog(TEST_MESSAGE, loggingLevel.error);
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    });
    it('should log message using console.warn if logLevel is warning', () => {
        colorLog(TEST_MESSAGE, loggingLevel.warning);
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    });
    it('should log error message with red color', () => {
        colorLog(TEST_MESSAGE, loggingLevel.error);
        expect(consoleErrorSpy).toHaveBeenCalledWith(RED, TEST_MESSAGE);
    });
    it('should log warning message with yellow color', () => {
        colorLog(TEST_MESSAGE, loggingLevel.warning);
        expect(consoleWarnSpy).toHaveBeenCalledWith(YELLOW, TEST_MESSAGE);
    });
    it('should log success message with green color', () => {
        colorLog(TEST_MESSAGE, loggingLevel.success);
        expect(consoleLogSpy).toHaveBeenCalledWith(GREEN, TEST_MESSAGE);
    });
    it('should log info message with blue color', () => {
        colorLog(TEST_MESSAGE, loggingLevel.info);
        expect(consoleLogSpy).toHaveBeenCalledWith(BLUE, TEST_MESSAGE);
    });
});
