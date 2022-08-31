import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import BulkGateApplicationApplication, {
    APPLICATION_ID,
    APPLICATION_TOKEN,
    NAME as BULKGATE_APP,
} from '../../lib/BulkGate/BulkGateApplicationApplication';
import BulkGateGetPromotionalSMSConnector from '../../lib/BulkGate/Connectors/BulkGateGetPromotionalSMSConnector';
import BulkGateGetTransactionSMSConnector from '../../lib/BulkGate/Connectors/BulkGateGetTransactionSMSConnector';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(BULKGATE_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [APPLICATION_TOKEN]: 'application token',
            [APPLICATION_ID]: 'application id',
        },
    });

    const bulkGateApp = new BulkGateApplicationApplication();
    const bulkGateGetPromotionalSMSConnector = new BulkGateGetPromotionalSMSConnector();
    const bulkGateGetTransactionSMSConnector = new BulkGateGetTransactionSMSConnector();
    container.setApplication(bulkGateApp);

    bulkGateGetPromotionalSMSConnector
        .setSender(sender)
        .setDb(db)
        .setApplication(bulkGateApp);
    container.setConnector(bulkGateGetPromotionalSMSConnector);

    bulkGateGetTransactionSMSConnector
        .setSender(sender)
        .setDb(db)
        .setApplication(bulkGateApp);
    container.setConnector(bulkGateGetTransactionSMSConnector);
}
