import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import VonageSendSMSConnector from '../../lib/Vonage/Connector/VonageSendSMSConnector';
import VonageApplication, { API_KEY, API_SECRET, NAME } from '../../lib/Vonage/VonageApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

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
