import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import FapiGetItemTemplateListBatch from '../../lib/Fapi/Batch/FapiGetItemTemplateListBatch';
import FapiGetLabelListBatch from '../../lib/Fapi/Batch/FapiGetLabelListBatch';
import FapiGetProjectListBatch from '../../lib/Fapi/Batch/FapiGetProjectListBatch';
import FapiGetShippingMethodListBatch from '../../lib/Fapi/Batch/FapiGetShippingMethodListBatch';
import FapiSubscribeWebhooksBatch from '../../lib/Fapi/Batch/FapiSubscribeWebhooksBatch';
import FapiUnsubscribeWebhooksBatch from '../../lib/Fapi/Batch/FapiUnsubscribeWebhooksBatch';
import FapiGetInvoiceConnector from '../../lib/Fapi/Connector/FapiGetInvoiceConnector';
import FapiPostInvoiceLabelConnector from '../../lib/Fapi/Connector/FapiPostInvoiceLabelConnector';
import FapiApplication, { NAME as FAPI_APPLICATION } from '../../lib/Fapi/FapiApplication';
import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

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
