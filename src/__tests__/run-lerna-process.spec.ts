import runLernaProcess from '../run-lerna-process';
import * as runProcess from '../run-process';
import * as log from '../color-log';
// import { PromptAnswer } from '../interfaces';
describe('runLernaProcess - get apps name and run lerna with scope of this apps name', () => {
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });
    it('should construct scope arguments from apps name list', () => {
        jest.spyOn(log, 'colorLog').mockImplementation();
        const runSpy = jest.spyOn(runProcess, 'default').mockImplementation();

        const answers = { name: ['@wk/app1', '@wk/app2'] };
        const args = ['', '', 'lerna', 'run', 'start'];
        const runArgs = ['run', 'start', '--scope', '@wk/app1', '--scope', '@wk/app2'];

        runLernaProcess(answers, args);
        expect(runSpy).toHaveBeenCalledTimes(1);
        expect(runSpy).toHaveBeenCalledWith('lerna', runArgs);
    });
});
