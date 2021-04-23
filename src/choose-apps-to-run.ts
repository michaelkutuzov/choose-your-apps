#!/usr/bin/env node
import { prompt } from 'prompts';
import { colorLog, loggingLevel } from './color-log';
import runLernaProcess from './run-lerna-process';
import { getChoices } from './get-choices';
import { readFileSync, writeFileSync } from 'fs';

const WITH_SPACE = ' ';
const DEFAULT_APPS_JSON = 'saved-apps.json';

const chooseAppsToRun = async (args: string[]) => {
    const LERNA_RUN = 'lerna run';
    const ARGS_FOR_CHECK = args.slice(0, 2).join(WITH_SPACE);
    const hasUnknownArgs = ARGS_FOR_CHECK.toLowerCase() !== LERNA_RUN;
    if (!hasUnknownArgs) {
        const npmScriptToRun = args[4];
        if (!checkForSavedApps(npmScriptToRun)) {
            const answers = await prompt({
                type: 'multiselect',
                name: 'appsToRun',
                message: 'Choose apps to run',
                choices: getChoices(npmScriptToRun),
                hint: '- Space to select. Return to submit',
            });
            runLernaProcess(answers, args);
        } else {
            runLernaProcess(DEFAULT_APPS_JSON[npmScriptToRun], args);
        }
        // if new set of apps are differ from saved - ask for saving new set
        // save - yes or no(use prompt). If yes - add array of answers to special JSON using "npmScriptToRun" as key
        return 0;
    } else {
        colorLog(
            `Unknown arguments provided for choose-apps-to-run.js\n. Need ${LERNA_RUN} ... and got ${ARGS_FOR_CHECK}`,
            loggingLevel.error
        );
        process.exit(1);
    }
};

const checkForSavedApps = async npmScriptToRun => {
    // if npmScriptToRun in JSON
    const defaultApps = getSavedApps(npmScriptToRun);
    if (defaultApps && Array.isArray(defaultApps) && defaultApps.length) {
        const answer = await prompt({
            type: 'confirm',
            name: 'useSaved',
            message: `You have an saved set of apps to run: ${defaultApps}. Run ${npmScriptToRun} with this set?`,
            initial: true,
        });

        return answer;
    }

    return false;
};

const setSavedApps = (key: string, apps) => {
    const json = getDefaultAppsJson();
    const data = {
        ...json,
        [key]: apps,
    };
    writeFileSync(DEFAULT_APPS_JSON, data);
};

const getSavedApps = (key: string) => {
    const json = getDefaultAppsJson();

    return json[key];
};

const getDefaultAppsJson = () => {
    const rawdata = readFileSync(DEFAULT_APPS_JSON).toString();
    const json = JSON.parse(rawdata);

    return json;
};

export default chooseAppsToRun;
