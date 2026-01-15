import {
    appInstall,
    DEFAULT_ACCESS_TOKEN,
    DEFAULT_CLIENT_ID,
    DEFAULT_CLIENT_SECRET,
    DEFAULT_USER,
} from '@orchesty/nodejs-connectors/test/DataProvider';
import {
    container, db, oauth2Provider, sender,
} from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import MergadoListAppsBatch from '../src/Batch/MergadoListAppsBatch';
import MergadoCreateElementConnector from '../src/Connector/MergadoCreateElementConnector';
import MergadoGetProjectConnector from '../src/Connector/MergadoGetProjectConnector';
import MergadoGetUserConnector from '../src/Connector/MergadoGetUserConnector';
import MergadoApplication, { NAME as MERGADO_APP } from '../src/MergadoApplication';

export default function init(): void {
    appInstall(MERGADO_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });

    const app = new MergadoApplication(oauth2Provider);
    container.setApplication(app);

    const listApps = new MergadoListAppsBatch();
    const getUser = new MergadoGetUserConnector();
    const getProject = new MergadoGetProjectConnector();
    const createElement = new MergadoCreateElementConnector();

    listApps
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(listApps);
    getUser
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getUser);
    getProject
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getProject);
    createElement
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createElement);
}
