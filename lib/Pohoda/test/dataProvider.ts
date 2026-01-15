import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import PohodaGetActivityListBatch from '../src/Batch/PohodaGetActivityListBatch';
import PohodaGetAddressBookListBatch from '../src/Batch/PohodaGetAddressBookListBatch';
import PohodaGetCentreListBatch from '../src/Batch/PohodaGetCentreListBatch';
import PohodaGetIssuedInvoiceListBatch from '../src/Batch/PohodaGetIssuedInvoiceListBatch';
import PohodaGetIssuedOrderListBatch from '../src/Batch/PohodaGetIssuedOrderListBatch';
import PohodaGetIssueListBatch from '../src/Batch/PohodaGetIssueListBatch';
import PohodaGetOrderParameterListBatch from '../src/Batch/PohodaGetOrderParameterListBatch';
import PohodaGetPaymentListBatch from '../src/Batch/PohodaGetPaymentListBatch';
import PohodaGetReceiptListBatch from '../src/Batch/PohodaGetReceiptListBatch';
import PohodaGetReceivedInvoiceListBatch from '../src/Batch/PohodaGetReceivedInvoiceListBatch';
import PohodaGetReceivedOrderListBatch from '../src/Batch/PohodaGetReceivedOrderListBatch';
import PohodaGetStockListBatch from '../src/Batch/PohodaGetStockListBatch';
import PohodaGetStoreListBatch from '../src/Batch/PohodaGetStoreListBatch';
import PohodaGetUserCodeListBatch from '../src/Batch/PohodaGetUserCodeListBatch';
import PohodaPostInvoiceConnector from '../src/Connector/PohodaPostInvoiceConnector';
import PohodaPostIssueConnector from '../src/Connector/PohodaPostIssueConnector';
import PohodaPostReceiptConnector from '../src/Connector/PohodaPostReceiptConnector';
import PohodaPutStockConnector from '../src/Connector/PohodaPutStockConnector';
import PohodaApplication, { ICO, M_SERVER_URL, NAME } from '../src/PohodaApplication';

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

    container.setNode(new PohodaGetActivityListBatch(), pohodaApplication);
    container.setNode(new PohodaGetAddressBookListBatch(), pohodaApplication);
    container.setNode(new PohodaGetCentreListBatch(), pohodaApplication);
    container.setNode(new PohodaGetIssueListBatch(), pohodaApplication);
    container.setNode(new PohodaPostIssueConnector(), pohodaApplication);
    container.setNode(new PohodaGetIssuedInvoiceListBatch(), pohodaApplication);
    container.setNode(new PohodaGetIssuedOrderListBatch(), pohodaApplication);
    container.setNode(new PohodaGetOrderParameterListBatch(), pohodaApplication);
    container.setNode(new PohodaGetPaymentListBatch(), pohodaApplication);
    container.setNode(new PohodaGetReceiptListBatch(), pohodaApplication);
    container.setNode(new PohodaGetReceivedInvoiceListBatch(), pohodaApplication);
    container.setNode(new PohodaGetReceivedOrderListBatch(), pohodaApplication);
    container.setNode(new PohodaGetStockListBatch(), pohodaApplication);
    container.setNode(new PohodaPutStockConnector(), pohodaApplication);
    container.setNode(new PohodaGetStoreListBatch(), pohodaApplication);
    container.setNode(new PohodaGetUserCodeListBatch(), pohodaApplication);
    container.setNode(new PohodaPostInvoiceConnector(), pohodaApplication);
    container.setNode(new PohodaPostReceiptConnector(), pohodaApplication);
}
