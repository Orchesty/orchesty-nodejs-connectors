import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import NutshellGetAccountConnector from '../../lib/Nutshell/Connector/NutshellGetAccountConnector';
import NutshellNewAccountConnector from '../../lib/Nutshell/Connector/NutshellNewAccountConnector';
import NutshellNewLeadConnector from '../../lib/Nutshell/Connector/NutshellNewLeadConnector';
import NutshellNewTaskConnector from '../../lib/Nutshell/Connector/NutshellNewTaskConnector';
import NutshellApplication, { NAME as NUTSHELL_APP } from '../../lib/Nutshell/NutshellApplication';
import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(NUTSHELL_APP, DEFAULT_USER, {
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
