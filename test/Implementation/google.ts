import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import GoogleCloudLoggingGetEntryListBatch from '../../lib/Google/GoogleCloudLogging/Batch/GoogleCloudLoggingGetEntryListBatch';
import GoogleCloudLoggingApplication, { NAME as GOOGLE_CLOUD_LOGGING_APPLICATION } from '../../lib/Google/GoogleCloudLogging/GoogleCloudLoggingApplication';
import { CLIENT_ID, TOKEN } from '../../lib/Tableau/TableauApplication';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_CLIENT_ID, DEFAULT_CLIENT_SECRET, DEFAULT_USER } from '../DataProvider';
import { container, db, oauth2Provider, prepare, sender } from '../TestAbstract';

export default function init(): void {
    appInstall(GOOGLE_CLOUD_LOGGING_APPLICATION, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });

    prepare();
    const app = new GoogleCloudLoggingApplication(oauth2Provider);
    container.setApplication(app);

    container.setBatch(new GoogleCloudLoggingGetEntryListBatch().setApplication(app).setSender(sender).setDb(db));
}
