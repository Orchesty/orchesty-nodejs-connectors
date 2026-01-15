import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import VonageSendSMSConnector from '../src/Connector/VonageSendSMSConnector';
import VonageApplication, { API_KEY, API_SECRET, NAME } from '../src/VonageApplication';

export default function init(): void {
    appInstall(NAME, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [API_KEY]: 'Api_Key',
            [API_SECRET]: 'Api_secret',
        },
    });

    const app = new VonageApplication();
    container.setApplication(app);

    const sendSMS = new VonageSendSMSConnector();

    sendSMS
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(sendSMS);
}
