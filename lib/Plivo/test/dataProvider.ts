import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import PlivoSendSMSConector from '../src/Connector/PlivoSendSMSConector';
import PlivoApplication, { AUTH_ID, AUTH_TOKEN, NAME } from '../src/PlivoApplication';

export default function init(): void {
    appInstall(NAME, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [AUTH_ID]: 'AUTH_ID',
            [AUTH_TOKEN]: 'AUTH_TOKEN',
        },
    });

    const app = new PlivoApplication();
    container.setApplication(app);

    const sendSMS = new PlivoSendSMSConector();

    sendSMS
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(sendSMS);
}
