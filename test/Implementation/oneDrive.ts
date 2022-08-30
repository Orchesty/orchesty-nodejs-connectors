import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import OneDriveUploadFileConnector from '../../lib/OneDrive/Connector/OneDriveUploadFileConnector';
import OneDriveApplication, { NAME as ONEDRIVE_APP, TOKEN } from '../../lib/OneDrive/OneDriveApplication';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import {
    container, db, oauth2Provider, sender,
} from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(ONEDRIVE_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [TOKEN]: DEFAULT_ACCESS_TOKEN,
            [CLIENT_ID]: CLIENT_ID,
            [CLIENT_SECRET]: CLIENT_SECRET,
        },
    });

    const app = new OneDriveApplication(oauth2Provider);
    container.setApplication(app);

    const uploadFile = new OneDriveUploadFileConnector();

    uploadFile
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(uploadFile);
}
