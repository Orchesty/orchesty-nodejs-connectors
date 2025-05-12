import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import PohodaGetCentreListBatch from '../../lib/Pohoda/Batch/PohodaGetCentreListBatch';
import PohodaGetIssuedOrderListBatch from '../../lib/Pohoda/Batch/PohodaGetIssuedOrderListBatch';
import PohodaGetIssueListBatch from '../../lib/Pohoda/Batch/PohodaGetIssueListBatch';
import PohodaGetOrderParameterListBatch from '../../lib/Pohoda/Batch/PohodaGetOrderParameterListBatch';
import PohodaGetReceiptListBatch from '../../lib/Pohoda/Batch/PohodaGetReceiptListBatch';
import PohodaGetReceivedOrderListBatch from '../../lib/Pohoda/Batch/PohodaGetReceivedOrderListBatch';
import PohodaGetStockListBatch from '../../lib/Pohoda/Batch/PohodaGetStockListBatch';
import PohodaGetStoreListBatch from '../../lib/Pohoda/Batch/PohodaGetStoreListBatch';
import PohodaGetUserCodeListBatch from '../../lib/Pohoda/Batch/PohodaGetUserCodeListBatch';
import PohodaPostInvoiceConnector from '../../lib/Pohoda/Connector/PohodaPostInvoiceConnector';
import PohodaPostIssueConnector from '../../lib/Pohoda/Connector/PohodaPostIssueConnector';
import PohodaPostReceiptConnector from '../../lib/Pohoda/Connector/PohodaPostReceiptConnector';
import PohodaPutStockConnector from '../../lib/Pohoda/Connector/PohodaPutStockConnector';
import PohodaApplication, { ICO, M_SERVER_URL, NAME } from '../../lib/Pohoda/PohodaApplication';
import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

export default function init(): void {
    appInstall(NAME, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [M_SERVER_URL]: 'http://localhost',
            [USER]: DEFAULT_USER,
            [PASSWORD]: DEFAULT_PASSWORD,
            [ICO]: '12345678',
        },
    });

    const pohodaApplication = new PohodaApplication();
    container.setApplication(pohodaApplication);

    container.setNode(new PohodaGetCentreListBatch(), pohodaApplication);
    container.setNode(new PohodaGetIssueListBatch(), pohodaApplication);
    container.setNode(new PohodaGetOrderParameterListBatch(), pohodaApplication);
    container.setNode(new PohodaPostIssueConnector(), pohodaApplication);
    container.setNode(new PohodaGetIssuedOrderListBatch(), pohodaApplication);
    container.setNode(new PohodaGetReceiptListBatch(), pohodaApplication);
    container.setNode(new PohodaPostReceiptConnector(), pohodaApplication);
    container.setNode(new PohodaGetReceivedOrderListBatch(), pohodaApplication);
    container.setNode(new PohodaGetStockListBatch(), pohodaApplication);
    container.setNode(new PohodaPutStockConnector(), pohodaApplication);
    container.setNode(new PohodaGetStoreListBatch(), pohodaApplication);
    container.setNode(new PohodaGetUserCodeListBatch(), pohodaApplication);
    container.setNode(new PohodaPostInvoiceConnector(), pohodaApplication);
}
