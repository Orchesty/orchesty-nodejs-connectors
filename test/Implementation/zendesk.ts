import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import ZendeskCreateWebhookConnector from '../../lib/Zendesk/Batch/ZendeskCreateWebhookConnector';
import ZendeskDeleteWebhookConnector from '../../lib/Zendesk/Batch/ZendeskDeleteWebhookConnector';
import ZendeskListTicketsBatch from '../../lib/Zendesk/Batch/ZendeskListTicketsBatch';
import ZendeskListUsersBatch from '../../lib/Zendesk/Batch/ZendeskListUsersBatch';
import ZendeskCreateTicketConnector from '../../lib/Zendesk/Connector/ZendeskCreateTicketConnector';
import ZendeskCreateTriggerConnector from '../../lib/Zendesk/Connector/ZendeskCreateTriggerConnector';
import ZendeskCreateUserConnector from '../../lib/Zendesk/Connector/ZendeskCreateUserConnector';
import ZendeskDeleteTriggerConnector from '../../lib/Zendesk/Connector/ZendeskDeleteTriggerConnector';
import ZendeskApplication, { NAME as ZENDESK_APP, SUBDOMAIN } from '../../lib/Zendesk/ZendeskApplication';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_CLIENT_SECRET, DEFAULT_USER } from '../DataProvider';
import { container, db, oauth2Provider, sender } from '../TestAbstract';

export default function init(): void {
    appInstall(ZENDESK_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_USER,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [SUBDOMAIN]: 'hbtest8393',
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });
    appInstall(ZENDESK_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_USER,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [SUBDOMAIN]: 'hbtest8393',
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });
    const app = new ZendeskApplication(oauth2Provider);
    container.setApplication(app);

    const createUser = new ZendeskCreateUserConnector();
    const createTicket = new ZendeskCreateTicketConnector();
    const listUser = new ZendeskListUsersBatch();
    const listTicket = new ZendeskListTicketsBatch();

    createUser
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createUser);

    createTicket
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createTicket);

    listUser
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(listUser);

    listTicket
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(listTicket);

    container.setNode(new ZendeskCreateWebhookConnector(), app);
    container.setNode(new ZendeskDeleteWebhookConnector(), app);
    container.setNode(new ZendeskCreateTriggerConnector(), app);
    container.setNode(new ZendeskDeleteTriggerConnector(), app);
}
