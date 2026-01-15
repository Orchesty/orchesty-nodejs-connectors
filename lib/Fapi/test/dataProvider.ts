import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import FapiGetItemTemplateListBatch from '../src/Batch/FapiGetItemTemplateListBatch';
import FapiGetLabelListBatch from '../src/Batch/FapiGetLabelListBatch';
import FapiGetProjectListBatch from '../src/Batch/FapiGetProjectListBatch';
import FapiGetShippingMethodListBatch from '../src/Batch/FapiGetShippingMethodListBatch';
import FapiSubscribeWebhooksBatch from '../src/Batch/FapiSubscribeWebhooksBatch';
import FapiUnsubscribeWebhooksBatch from '../src/Batch/FapiUnsubscribeWebhooksBatch';
import FapiGetInvoiceConnector from '../src/Connector/FapiGetInvoiceConnector';
import FapiPostInvoiceLabelConnector from '../src/Connector/FapiPostInvoiceLabelConnector';
import FapiApplication, { NAME as FAPI_APPLICATION } from '../src/FapiApplication';

export default function init(): void {
    appInstall(FAPI_APPLICATION, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [USER]: DEFAULT_USER,
            [PASSWORD]: DEFAULT_PASSWORD,
        },
    });

    const fapiApplication = new FapiApplication();
    container.setApplication(fapiApplication);

    container.setNode(new FapiGetItemTemplateListBatch(), fapiApplication);
    container.setNode(new FapiGetLabelListBatch(), fapiApplication);
    container.setNode(new FapiGetProjectListBatch(), fapiApplication);
    container.setNode(new FapiGetShippingMethodListBatch(), fapiApplication);
    container.setNode(new FapiSubscribeWebhooksBatch(), fapiApplication);
    container.setNode(new FapiUnsubscribeWebhooksBatch(), fapiApplication);
    container.setNode(new FapiGetInvoiceConnector(), fapiApplication);
    container.setNode(new FapiPostInvoiceLabelConnector(), fapiApplication);
}
