import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import PlivoSendSMSConector from '../../lib/Plivo/Connector/PlivoSendSMSConector';
import PlivoApplication, { AUTH_ID, AUTH_TOKEN, NAME } from '../../lib/Plivo/PlivoApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

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
