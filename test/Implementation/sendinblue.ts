import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import SendiblueCreateCampaignConnector from '../../lib/Sendinblue/Connector/SendiblueCreateCampaignConnector';
import SendinblueSendEmailConnector from '../../lib/Sendinblue/Connector/SendinblueSendEmailConnector';
import SendinblueApplication, { API_KEY, NAME as SENDINBLUE_APP } from '../../lib/Sendinblue/SendinblueApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

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
