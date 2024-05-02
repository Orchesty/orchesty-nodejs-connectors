import { container } from '@orchesty/nodejs-sdk';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import DatabaseClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Database/Client';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import FabisImportBatchConnector from '../../lib/Fabis/Connector/FabisImportBatchConnector';
import FabisApplication, { FABIS_APPLICATION } from '../../lib/Fabis/FabisApplication';
import { CLIENT_ID } from '../../lib/Tableau/TableauApplication';
import {
    appInstall,
    DEFAULT_ACCESS_TOKEN,
    DEFAULT_CLIENT_ID,
    DEFAULT_CLIENT_SECRET,
    DEFAULT_USER,
} from '../DataProvider';

export function initFabisIntegrationTest(): void {
    appInstall(FABIS_APPLICATION, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });

    const app = new FabisApplication();
    container.setApplication(app);
    const sender = container.get(CurlSender);
    const db = container.get(DatabaseClient);

    const importBatch = new FabisImportBatchConnector();
    importBatch
        .setSender(sender)
        .setDb(db)
        .setApplication(app);

    container.setNode(importBatch);
}
