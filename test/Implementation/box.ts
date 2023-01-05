import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import BoxListTasksBatch from '../../lib/Box/Batch/BoxListTasksBatch';
import BoxApplication, { NAME as BOX_APP } from '../../lib/Box/BoxApplication';
import BoxGetCollaborationConnector from '../../lib/Box/Connector/BoxGetCollaborationConnector';
import BoxGetUserConnector from '../../lib/Box/Connector/BoxGetUserConnector';
import {
    appInstall,
    DEFAULT_ACCESS_TOKEN,
    DEFAULT_CLIENT_ID,
    DEFAULT_CLIENT_SECRET,
    DEFAULT_USER,
} from '../DataProvider';
import { container, db, oauth2Provider, sender } from '../TestAbstract';

export default function init(): void {
    appInstall(BOX_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });

    const app = new BoxApplication(oauth2Provider);
    container.setApplication(app);

    const getCollaboration = new BoxGetCollaborationConnector();
    const getUser = new BoxGetUserConnector();
    const listTasks = new BoxListTasksBatch();
    getCollaboration
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getCollaboration);
    getUser
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getUser);
    listTasks
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(listTasks);
}
