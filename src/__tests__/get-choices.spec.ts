import * as fs from 'fs';
import * as path from 'path';
import * as child_process from 'child_process';
import { getChoices, hasScriptToRun } from '../get-choices';
import { App } from '../interfaces';

const firstAppLocation = './__tests__/__mocks__/app1';
const secondAppLocation = './__tests__/__mocks__/app2';

const mockedApplicationWithScript: App = {
    name: '@wk/mockedApplicationWithScript',
    location: firstAppLocation,
};
const mockedApplicationWithoutScript: App = {
    name: '@wk/mockedApplicationWithoutScript',
    location: secondAppLocation,
};

describe('getChoices - function to create array of objects in form { title: app.name, value: app.name } from apps who contains corresponding npm script in theirs package.json files', () => {
    const sourceForExecSync = `[
        ${JSON.stringify(mockedApplicationWithScript)},
        ${JSON.stringify(mockedApplicationWithoutScript)}
    ]`;

    it('should get full list of apps/packages', () => {
        const childProcessSpy = jest
            .spyOn(child_process, 'execSync')
            .mockImplementation(() => Buffer.from(sourceForExecSync));
        const npmScriptToRun = 'test';

        getChoices(npmScriptToRun);
        expect(childProcessSpy).toHaveBeenCalledWith('lerna ls --json --all');
    });

    it('should create choices from apps with corresponding script data', () => {
        jest.spyOn(child_process, 'execSync').mockImplementation(() => Buffer.from(sourceForExecSync));
        const npmScriptToRun = 'test';
        const choices = getChoices(npmScriptToRun);

        const { name } = mockedApplicationWithScript;
        expect(choices).toStrictEqual([{ title: name, value: name }]);
    });

    it('should return empty array it there are no apps with corresponding script in package.json', () => {
        jest.spyOn(child_process, 'execSync').mockImplementation(() => Buffer.from(sourceForExecSync));
        const npmScriptToRun = 'start';

        const choices = getChoices(npmScriptToRun);

        expect(choices).toStrictEqual([]);
    });
});

describe('hasScriptToRun - check that script name is in "scripts" section of package.json file of app', () => {
    it('should read package.json file of application', () => {
        const fsSpy = jest
            .spyOn(fs, 'readFileSync')
            .mockImplementationOnce(() => Buffer.from('{"scripts": {"test": "test" }}'));
        jest.spyOn(path, 'resolve').mockImplementationOnce(() => firstAppLocation);
        const npmScriptToRun = 'test';

        hasScriptToRun(npmScriptToRun)(mockedApplicationWithScript);
        expect(fsSpy).toHaveBeenCalledWith(`${firstAppLocation}/package.json`);
    });

    it('should return true if app has corresponding script', () => {
        const npmScriptToRun = 'test';
        const hasScript = hasScriptToRun(npmScriptToRun)(mockedApplicationWithScript);

        expect(hasScript).toEqual(true);
    });

    it("should return false if app doesn't have corresponding script", () => {
        const npmScriptToRun = 'test';
        const applicationsWithScripts = hasScriptToRun(npmScriptToRun)(mockedApplicationWithoutScript);

        expect(applicationsWithScripts).toEqual(false);
    });
});
