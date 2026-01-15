import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { cacheService, container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import MailstepGetCarrierListBatch from '../src/Batch/MailstepGetCarrierListBatch';
import MailstepGetCarrierServiceListBatch from '../src/Batch/MailstepGetCarrierServiceListBatch';
import MailstepGetEshopListBatch from '../src/Batch/MailstepGetEshopListBatch';
import MailstepGetExpeditionListBatch from '../src/Batch/MailstepGetExpeditionListBatch';
import MailstepGetInboundReceiptListBatch from '../src/Batch/MailstepGetInboundReceiptListBatch';
import MailstepGetOutboundReceiptListBatch from '../src/Batch/MailstepGetOutboundReceiptListBatch';
import MailstepGetProductListBatch from '../src/Batch/MailstepGetProductListBatch';
import MailstepGetProductStockListBatch from '../src/Batch/MailstepGetProductStockListBatch';
import MailstepGetStockMovementListBatch from '../src/Batch/MailstepGetStockMovementListBatch';
import MailstepGetWarehouseListBatch from '../src/Batch/MailstepGetWarehouseListBatch';
import MailstepGetWmsListBatch from '../src/Batch/MailstepGetWmsListBatch';
import MailstepSubscribeWebhooksBatch from '../src/Batch/MailstepSubscribeWebhooksBatch';
import MailstepUnsubscribeWebhooksBatch from '../src/Batch/MailstepUnsubscribeWebhooksBatch';
import MailstepGetExpeditionConnector from '../src/Connector/MailstepGetExpeditionConnector';
import MailstepGetProductStockConnector from '../src/Connector/MailstepGetProductStockConnector';
import MailstepGetStockAdviceConnector from '../src/Connector/MailstepGetStockAdviceConnector';
import MailstepGetSupplierConnector from '../src/Connector/MailstepGetSupplierConnector';
import MailstepPostExpeditionConnector from '../src/Connector/MailstepPostExpeditionConnector';
import MailstepPostProductConnector from '../src/Connector/MailstepPostProductConnector';
import MailstepPutExpeditionConnector from '../src/Connector/MailstepPutExpeditionConnector';
import MailstepPutProductConnector from '../src/Connector/MailstepPutProductConnector';
import MailstepSendExpeditionConnector from '../src/Connector/MailstepSendExpeditionConnector';
import MailstepApplication, { NAME as MAILSTEP_APPLICATION } from '../src/MailstepApplication';

export default function init(): void {
    appInstall(MAILSTEP_APPLICATION, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [USER]: DEFAULT_USER,
            [PASSWORD]: DEFAULT_PASSWORD,
        },
    });

    const mailstepApplication = new MailstepApplication(cacheService);
    container.setApplication(mailstepApplication);

    container.setNode(new MailstepGetCarrierListBatch(), mailstepApplication);
    container.setNode(new MailstepGetCarrierServiceListBatch(), mailstepApplication);
    container.setNode(new MailstepGetEshopListBatch(), mailstepApplication);
    container.setNode(new MailstepGetExpeditionListBatch(), mailstepApplication);
    container.setNode(new MailstepGetExpeditionConnector(), mailstepApplication);
    container.setNode(new MailstepPostExpeditionConnector(), mailstepApplication);
    container.setNode(new MailstepPutExpeditionConnector(), mailstepApplication);
    container.setNode(new MailstepSendExpeditionConnector(), mailstepApplication);
    container.setNode(new MailstepGetInboundReceiptListBatch(), mailstepApplication);
    container.setNode(new MailstepGetOutboundReceiptListBatch(), mailstepApplication);
    container.setNode(new MailstepGetProductListBatch(), mailstepApplication);
    container.setNode(new MailstepPostProductConnector(), mailstepApplication);
    container.setNode(new MailstepPutProductConnector(), mailstepApplication);
    container.setNode(new MailstepGetProductStockListBatch(), mailstepApplication);
    container.setNode(new MailstepGetProductStockConnector(), mailstepApplication);
    container.setNode(new MailstepGetStockMovementListBatch(), mailstepApplication);
    container.setNode(new MailstepGetWarehouseListBatch(), mailstepApplication);
    container.setNode(new MailstepGetWmsListBatch(), mailstepApplication);
    container.setNode(new MailstepSubscribeWebhooksBatch(), mailstepApplication);
    container.setNode(new MailstepUnsubscribeWebhooksBatch(), mailstepApplication);
    container.setNode(new MailstepGetStockAdviceConnector(), mailstepApplication);
    container.setNode(new MailstepGetSupplierConnector(), mailstepApplication);
}
