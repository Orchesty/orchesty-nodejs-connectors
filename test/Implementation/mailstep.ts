import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import MailstepGetCarrierListBatch from '../../lib/Mailstep/Batch/MailstepGetCarrierListBatch';
import MailstepGetCarrierServiceListBatch from '../../lib/Mailstep/Batch/MailstepGetCarrierServiceListBatch';
import MailstepGetEshopListBatch from '../../lib/Mailstep/Batch/MailstepGetEshopListBatch';
import MailstepGetExpeditionListBatch from '../../lib/Mailstep/Batch/MailstepGetExpeditionListBatch';
import MailstepGetInboundReceiptListBatch from '../../lib/Mailstep/Batch/MailstepGetInboundReceiptListBatch';
import MailstepGetOutboundReceiptListBatch from '../../lib/Mailstep/Batch/MailstepGetOutboundReceiptListBatch';
import MailstepGetProductListBatch from '../../lib/Mailstep/Batch/MailstepGetProductListBatch';
import MailstepGetProductStockListBatch from '../../lib/Mailstep/Batch/MailstepGetProductStockListBatch';
import MailstepGetStockMovementListBatch from '../../lib/Mailstep/Batch/MailstepGetStockMovementListBatch';
import MailstepGetWarehouseListBatch from '../../lib/Mailstep/Batch/MailstepGetWarehouseListBatch';
import MailstepGetWmsListBatch from '../../lib/Mailstep/Batch/MailstepGetWmsListBatch';
import MailstepSubscribeWebhooksBatch from '../../lib/Mailstep/Batch/MailstepSubscribeWebhooksBatch';
import MailstepUnsubscribeWebhooksBatch from '../../lib/Mailstep/Batch/MailstepUnsubscribeWebhooksBatch';
import MailstepGetExpeditionConnector from '../../lib/Mailstep/Connector/MailstepGetExpeditionConnector';
import MailstepGetProductStockConnector from '../../lib/Mailstep/Connector/MailstepGetProductStockConnector';
import MailstepPostExpeditionConnector from '../../lib/Mailstep/Connector/MailstepPostExpeditionConnector';
import MailstepPostProductConnector from '../../lib/Mailstep/Connector/MailstepPostProductConnector';
import MailstepPutExpeditionConnector from '../../lib/Mailstep/Connector/MailstepPutExpeditionConnector';
import MailstepPutProductConnector from '../../lib/Mailstep/Connector/MailstepPutProductConnector';
import MailstepSendExpeditionConnector from '../../lib/Mailstep/Connector/MailstepSendExpeditionConnector';
import MailstepApplication, { NAME as MAILSTEP_APPLICATION } from '../../lib/Mailstep/MailstepApplication';
import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '../DataProvider';
import { cacheService, container } from '../TestAbstract';

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
}
