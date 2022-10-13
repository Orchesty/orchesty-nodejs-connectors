import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import BulkGateApplication, {
    APPLICATION_ID,
    APPLICATION_TOKEN,
    NAME as BULKGATE_APP,
} from '../../lib/BulkGate/BulkGateApplication';
import BulkGateGetPromotionalSMSConnector from '../../lib/BulkGate/Connector/BulkGateGetPromotionalSMSConnector';
import BulkGateGetTransactionSMSConnector from '../../lib/BulkGate/Connector/BulkGateGetTransactionSMSConnector';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(BULKGATE_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [APPLICATION_TOKEN]: 'application token',
            [APPLICATION_ID]: 'application id',
        },
    });

    const bulkGateApp = new BulkGateApplication();
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
