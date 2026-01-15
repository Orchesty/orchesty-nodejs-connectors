import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import BulkGateApplication, {
    APPLICATION_ID,
    APPLICATION_TOKEN,
    NAME as BULKGATE_APP,
} from '../src/BulkGateApplication';
import BulkGateGetPromotionalSMSConnector from '../src/Connector/BulkGateGetPromotionalSMSConnector';
import BulkGateGetTransactionSMSConnector from '../src/Connector/BulkGateGetTransactionSMSConnector';

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
