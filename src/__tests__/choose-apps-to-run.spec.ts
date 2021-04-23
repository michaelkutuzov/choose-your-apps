import chooseAppsToRun from '../choose-apps-to-run';
import * as runLernaProcess from '../run-lerna-process';
import * as prompts from 'prompts';
import * as log from '../color-log';

describe('chooseAppsToRun - ask prompt to choose that apps should start', () => {
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });
    it('should ask to choose apps to run if arguments are correct', async () => {
        const args = ['lerna', 'run', 'start:utd:dev'];
        const promptSpy = jest.spyOn(prompts, 'prompt').mockImplementation();
        const runLernaProcessSpy = jest.spyOn(runLernaProcess, 'default').mockImplementation();
        await chooseAppsToRun(args);
        expect(promptSpy).toHaveBeenCalledTimes(1);
        expect(runLernaProcessSpy).toHaveBeenCalledTimes(1);
    });

    it('should exit with code 1 if first args in not "lerna run"', async () => {
        const args = ['test', 'args'];
        jest.spyOn(log, 'colorLog').mockImplementation();
        const processSpy = jest.spyOn(process, 'exit').mockImplementation();
        await chooseAppsToRun(args);

        expect(processSpy).toBeCalledTimes(1);
        expect(processSpy).toBeCalledWith(1);
    });
});
