import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import SmtpSendEmail from '../../lib/Smtp/Connector/SmtpSendEmail';
import SmtpApplication, { CONNECTION_URL, NAME } from '../../lib/Smtp/SmtpApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import {
    container, db,
} from '../TestAbstract';

export const connectionUrl = 'smtps://username:password@smtp.example.com/?pool=true';

export default async function init(): Promise<void> {
    await appInstall(NAME, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CONNECTION_URL]: connectionUrl,
        },
    });

    const app = new SmtpApplication();
    container.setApplication(app);

    const sendEmail = new SmtpSendEmail()
        .setDb(db)
        .setApplication(app);
    container.setConnector(sendEmail);
}
