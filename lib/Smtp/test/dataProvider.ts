import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import {
    container, db,
} from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import SmtpSendEmail from '../src/Connector/SmtpSendEmail';
import SmtpApplication, { CONNECTION_URL, NAME } from '../src/SmtpApplication';

export const connectionUrl = 'smtps://username:password@smtp.example.com/?pool=true';

jest.mock('nodemailer', (): unknown => ({
    createTransport: jest.fn().mockReturnValue({
        sendMail: jest.fn().mockReturnValue({
            accepted: ['neco@gmail.com'],
            envelope: {
                from: 'neco@neco.com',
                to: ['neco@gmail.com'],
            },
            envelopeTime: 2,
            messageId: '<731836a2-74d2-36f6-8053-08242c91ce1c@neco.com>',
            messageSize: 614,
            messageTime: 3,
            rejected: [],
            response:
            '250 Ok: queued as uDtelNMtPWAML6YfHjji5zYLhJjL1frJBtBBOZNJIcE=@mailhog.example',
        }),
    }),
}));

export default function init(): void {
    appInstall(NAME, DEFAULT_USER, {
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
