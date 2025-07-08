import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import BulkGateApplication, {
    APPLICATION_ID,
    APPLICATION_TOKEN,
    NAME as BULKGATE_APP,
} from '../../lib/BulkGate/BulkGateApplication';
import BulkGateGetPromotionalSMSConnector from '../../lib/BulkGate/Connector/BulkGateGetPromotionalSMSConnector';
import BulkGateGetTransactionSMSConnector from '../../lib/BulkGate/Connector/BulkGateGetTransactionSMSConnector';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

export default function init(): void {
    appInstall(BULKGATE_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [APPLICATION_TOKEN]: 'application token',
            [APPLICATION_ID]: 'application id',
        },
    });

    const bulkGateApp = new BulkGateApplication();
    container.setApplication(bulkGateApp);

    container.setNode(new BulkGateGetPromotionalSMSConnector(), bulkGateApp);
    container.setNode(new BulkGateGetTransactionSMSConnector(), bulkGateApp);
}
