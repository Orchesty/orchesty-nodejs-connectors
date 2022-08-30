import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import SendiblueCreateCampaignConnector from '../../lib/Sendinblue/Connector/SendiblueCreateCampaignConnector';
import SendinblueSendEmailConnector from '../../lib/Sendinblue/Connector/SendinblueSendEmailConnector';
import SendinblueApplication, { API_KEY, NAME as SENDINBLUE_APP } from '../../lib/Sendinblue/SendinblueApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(SENDINBLUE_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [API_KEY]: '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',
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
