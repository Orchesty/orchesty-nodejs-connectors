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
import TypeformCreateFormConnector from '../src/Connector/TypeformCreateFormConnector';
import TypeformCreateWorkspaceConnector from '../src/Connector/TypeformCreateWorkspaceConnector';
import TypeformUpdateFormConnector from '../src/Connector/TypeformUpdateFormConnector';
import TypeformApplication, { NAME as TYPEFORM_APP } from '../src/TypeformApplication';

export default function init(): void {
    appInstall(TYPEFORM_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });

    const app = new TypeformApplication(oauth2Provider);
    container.setApplication(app);

    const createForm = new TypeformCreateFormConnector();
    const updateForm = new TypeformUpdateFormConnector();
    const createWorkspace = new TypeformCreateWorkspaceConnector();

    createForm
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createForm);
    updateForm
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(updateForm);
    createWorkspace
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createWorkspace);
}
