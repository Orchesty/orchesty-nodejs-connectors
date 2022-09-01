import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import TableauCreateConnectedAppConnector from '../../lib/Tableau/Connector/TableauCreateConnectedAppConnector';
import TableauGetConnectedAppConnector from '../../lib/Tableau/Connector/TableauGetConnectedAppConnector';
import TableauApplication, {
    CONTENT_URL,
    NAME as TABLEAU_APP,
    PREFIX_SITE,
    TOKEN_NAME,
    TOKEN_SECRET,
} from '../../lib/Tableau/TableauApplication';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_CLIENT_SECRET, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(TABLEAU_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [TOKEN_NAME]: DEFAULT_ACCESS_TOKEN,
            [TOKEN_SECRET]: DEFAULT_CLIENT_SECRET,
            [PREFIX_SITE]: 'prefix',
            [CONTENT_URL]: 'content_url',
        },
    });

    const tableauApp = new TableauApplication(sender, db);
    const tableauGetConnectedAppConnector = new TableauGetConnectedAppConnector();
    const tableauCreateConnectedAppConnector = new TableauCreateConnectedAppConnector();

    container.setApplication(tableauApp);

    tableauGetConnectedAppConnector
        .setSender(sender)
        .setDb(db)
        .setApplication(tableauApp);
    container.setConnector(tableauGetConnectedAppConnector);

    tableauCreateConnectedAppConnector
        .setSender(sender)
        .setDb(db)
        .setApplication(tableauApp);
    container.setConnector(tableauCreateConnectedAppConnector);
}
