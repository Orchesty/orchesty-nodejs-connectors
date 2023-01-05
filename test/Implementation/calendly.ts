import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import CalendlyListEventsBatch from '../../lib/Calendly/Batch/CalendlyListEventsBatch';
import CalendlyApplication, { NAME as CALENDLY_APP } from '../../lib/Calendly/CalendlyApplication';
import CalendlyGetUserConnector from '../../lib/Calendly/Connector/CalendlyGetUserConnector';
import CalendlyInviteUserConnector from '../../lib/Calendly/Connector/CalendlyInviteUserConnector';
import {
    appInstall,
    DEFAULT_ACCESS_TOKEN,
    DEFAULT_CLIENT_ID,
    DEFAULT_CLIENT_SECRET,
    DEFAULT_USER,
} from '../DataProvider';
import { container, db, oauth2Provider, sender } from '../TestAbstract';

export default function init(): void {
    appInstall(CALENDLY_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });

    const app = new CalendlyApplication(oauth2Provider);
    container.setApplication(app);
    const getUser = new CalendlyGetUserConnector();
    const listEvents = new CalendlyListEventsBatch();
    const inviteUser = new CalendlyInviteUserConnector();

    getUser
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getUser);
    listEvents
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(listEvents);
    inviteUser
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(inviteUser);
}
