import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import SendiblueCreateCampaignConnector from '../src/Connector/SendiblueCreateCampaignConnector';
import SendinblueSendEmailConnector from '../src/Connector/SendinblueSendEmailConnector';
import SendinblueApplication, { API_KEY, NAME as SENDINBLUE_APP } from '../src/SendinblueApplication';

export default function init(): void {
    appInstall(SENDINBLUE_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [API_KEY]: 'Api key',
        },
    });

    const app = new SendinblueApplication();
    container.setApplication(app);

    const sendEmail = new SendinblueSendEmailConnector();
    const createCampaign = new SendiblueCreateCampaignConnector();
    sendEmail
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(sendEmail);
    createCampaign
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createCampaign);
}
