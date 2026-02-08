import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_CLIENT_ID, DEFAULT_CLIENT_SECRET, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, oauth2Provider, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { orchestyOptions } from '@orchesty/nodejs-sdk/dist/lib/Config/Config';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import WflowSubscribeWebhookBatch from '../src/Batch/WflowSubscribeWebhookBatch';
import WflowUnsubscribeWebhookBatch from '../src/Batch/WflowUnsubscribeWebhookBatch';
import WflowGetDocumentConnector from '../src/Connector/WflowGetDocumentConnector';
import WflowGetDocumentTypesConnector from '../src/Connector/WflowGetDocumentTypesConnector';
import WflowGetOrganizationsConnector from '../src/Connector/WflowGetOrganizationsConnector';
import WflowPutDocumentConnector from '../src/Connector/WflowPutDocumentConnector';
import WflowUpdateDocumentStateConnector from '../src/Connector/WflowUpdateDocumentStateConnector';
import WflowApplication, { NAME as WFLOW_APP, ORGANIZATION, ORGANIZATION_FORM } from '../src/WflowApplication';

export default function init(): void {
    appInstall(WFLOW_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
        [ORGANIZATION_FORM]: {
            [ORGANIZATION]: 'test',
        },
    });

    mockOnce([
        {
            request: {
                method: HttpMethods.GET,
                url: new RegExp(`${orchestyOptions.workerApi}/document/Webhook.*`),
            },
            response: {
                code: 200,
                body: [],
            },
        },
    ]);

    const getOrganizationsConnector = new WflowGetOrganizationsConnector().setDb(db).setSender(sender);
    const app = new WflowApplication(oauth2Provider, getOrganizationsConnector);
    container.setApplication(app);

    container.setNode(new WflowGetDocumentConnector(), app);
    container.setNode(new WflowGetDocumentTypesConnector(), app);
    container.setNode(new WflowUpdateDocumentStateConnector(), app);
    container.setNode(new WflowSubscribeWebhookBatch(), app);
    container.setNode(new WflowUnsubscribeWebhookBatch(), app);
    container.setNode(new WflowPutDocumentConnector(), app);
    container.setNode(getOrganizationsConnector, app);
}
