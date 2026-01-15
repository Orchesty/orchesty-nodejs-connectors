import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import NutshellGetAccountConnector from '../src/Connector/NutshellGetAccountConnector';
import NutshellNewAccountConnector from '../src/Connector/NutshellNewAccountConnector';
import NutshellNewLeadConnector from '../src/Connector/NutshellNewLeadConnector';
import NutshellNewTaskConnector from '../src/Connector/NutshellNewTaskConnector';
import NutshellApplication, { NAME as NUTSHELL_APP } from '../src/NutshellApplication';

export default function init(): void {
    appInstall(NUTSHELL_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [USER]: DEFAULT_USER,
            [PASSWORD]: DEFAULT_PASSWORD,
        },
    });

    const app = new NutshellApplication();
    container.setApplication(app);

    const getAccount = new NutshellGetAccountConnector();
    const newAccount = new NutshellNewAccountConnector();
    const newLead = new NutshellNewLeadConnector();
    const newTask = new NutshellNewTaskConnector();

    getAccount
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getAccount);

    newAccount
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(newAccount);

    newLead
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(newLead);

    newTask
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(newTask);
}
