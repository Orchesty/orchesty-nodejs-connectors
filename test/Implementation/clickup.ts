import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import ClickupApplication, { NAME as CLICKUP_APP } from '../../lib/Clickup/ClickupApplication';
import ClickupCreateSpaceConnector from '../../lib/Clickup/Connector/ClickupCreateSpaceConnector';
import ClickupCreateTaskConnector from '../../lib/Clickup/Connector/ClickupCreateTaskConnector';
import ClickupGetUserConnector from '../../lib/Clickup/Connector/ClickupGetUserConnector';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(CLICKUP_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });

    const app = new ClickupApplication();
    container.setApplication(app);

    const getUser = new ClickupGetUserConnector();
    const createSpace = new ClickupCreateSpaceConnector();
    const createTask = new ClickupCreateTaskConnector();

    getUser
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getUser);

    createTask
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createTask);

    createSpace
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createSpace);
}
