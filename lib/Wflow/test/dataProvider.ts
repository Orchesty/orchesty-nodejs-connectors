import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_CLIENT_ID, DEFAULT_CLIENT_SECRET, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, oauth2Provider, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import WflowGetDocumentConnector from '../src/Connector/WflowGetDocumentConnector';
import WflowGetOrganizationsConnector from '../src/Connector/WflowGetOrganizationsConnector';
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

    const getOrganizationsConnector = new WflowGetOrganizationsConnector();
    const app = new WflowApplication(oauth2Provider, getOrganizationsConnector);
    container.setApplication(app);

    container.setConnector(new WflowGetDocumentConnector().setApplication(app).setDb(db).setSender(sender));
    container.setConnector(getOrganizationsConnector.setApplication(app).setDb(db).setSender(sender));
}
