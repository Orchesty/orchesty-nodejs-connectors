import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import OutlookGetEvents from '../../lib/Outlook/Batch/OutlookGetEvents';
import OutlookSubscribeWebhook from '../../lib/Outlook/Batch/OutlookSubscribeWebhook';
import OutlookUnsubscribeWebhook from '../../lib/Outlook/Batch/OutlookUnsubscribeWebhook';
import OutlookCreateEvent from '../../lib/Outlook/Connector/OutlookCreateEvent';
import OutlookDeleteEvent from '../../lib/Outlook/Connector/OutlookDeleteEvent';
import OutlookUpdateEvent from '../../lib/Outlook/Connector/OutlookUpdateEvent';
import OutlookApplication, { NAME as OUTLOOK_APP, TENANT_ID } from '../../lib/Outlook/OutlookApplication';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import { container, oauth2Provider } from '../TestAbstract';

export function mock(): void {
    appInstall(OUTLOOK_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [TOKEN]: '1234',
            [TENANT_ID]: DEFAULT_ACCESS_TOKEN,
            [CLIENT_ID]: CLIENT_ID,
            [CLIENT_SECRET]: CLIENT_SECRET,
        },
    });
}

export default function init(): void {
    const app = new OutlookApplication(oauth2Provider);
    container.setApplication(app);

    container.setNode(new OutlookCreateEvent(), app);
    container.setNode(new OutlookUpdateEvent(), app);
    container.setNode(new OutlookDeleteEvent(), app);
    container.setNode(new OutlookGetEvents(), app);
    container.setNode(new OutlookSubscribeWebhook(), app);
    container.setNode(new OutlookUnsubscribeWebhook(), app);
}
