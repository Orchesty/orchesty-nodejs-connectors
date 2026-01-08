import { appInstall, DEFAULT_USER, DEFAULT_CLIENT_ID, DEFAULT_CLIENT_SECRET, DEFAULT_ACCESS_TOKEN } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender, oauth2Provider } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import WflowGetDocumentConnector from '../src/Connector/WflowGetDocumentConnector';
import WflowApplication, { NAME as WFLOW_APP } from '../src/WflowApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';

export default function init(): void {
    appInstall(WFLOW_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });

    const app = new WflowApplication(oauth2Provider);
    container.setApplication(app);

    container.setConnector(new WflowGetDocumentConnector().setApplication(app).setDb(db).setSender(sender));
}
