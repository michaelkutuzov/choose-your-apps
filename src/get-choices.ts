import { resolve } from 'path';
import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { App, PromptChoice } from './interfaces';

export function getChoices(npmScriptToRun: string): PromptChoice[] {
    const apps = JSON.parse(execSync('lerna ls --json --all').toString('utf-8'));
    const choices: PromptChoice[] = apps
        .filter(hasScriptToRun(npmScriptToRun))
        .map((app: App) => ({ title: app.name, value: app.name }));

    return choices;
}

export function hasScriptToRun(npmScriptToRun: string): (app: App) => boolean {
    return function (app: App) {
        const location = resolve(__dirname, app.location);
        const file = readFileSync(`${location}/package.json`);
        const packageJson = JSON.parse(file.toString('utf-8'));

        return npmScriptToRun in packageJson.scripts;
    };
}
