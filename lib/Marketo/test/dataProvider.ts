import {
    appInstall,
    DEFAULT_ACCESS_TOKEN,
    DEFAULT_CLIENT_ID,
    DEFAULT_CLIENT_SECRET,
    DEFAULT_USER,
} from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import MarketoGetEmailsBatch from '../src/Batch/MarketoGetEmailsBatch';
import MarketoGetFilesBatch from '../src/Batch/MarketoGetFilesBatch';
import MarketoCreateEmailConnector from '../src/Connector/MarketoCreateEmailConnector';
import MarketoApplication, { MARKETO_URL, NAME as MARKETO_APP } from '../src/MarketoApplication';

export default function init(): void {
    appInstall(MARKETO_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [MARKETO_URL]: 'https://284-RPR-133.mktorest.com',
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });

    const app = new MarketoApplication(sender);
    container.setApplication(app);

    const getFiles = new MarketoGetFilesBatch();
    const getEmails = new MarketoGetEmailsBatch();
    const createEmail = new MarketoCreateEmailConnector();

    getFiles
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getFiles);

    getEmails
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getEmails);

    createEmail
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createEmail);
}
