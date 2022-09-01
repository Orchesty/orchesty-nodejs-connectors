import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import PipedriveGetAllLeadsBatch from '../../lib/Pipedrive/Batch/PipedriveGetAllLeadsBatch';
import PipedriveAddLeadConnector from '../../lib/Pipedrive/Connector/PipedriveAddLeadConnector';
import PipedriveUpdateLeadConnector from '../../lib/Pipedrive/Connector/PipedriveUpdateLeadConnector';
import PipedriveApplication, { NAME as PIPEDRIVE_APP, SUBDOMAIN } from '../../lib/Pipedrive/PipedriveApplication';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(PIPEDRIVE_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [SUBDOMAIN]: 'company',
            [TOKEN]: DEFAULT_ACCESS_TOKEN,
        },
    });

    const app = new PipedriveApplication();
    const getAllLeads = new PipedriveGetAllLeadsBatch();
    const addLead = new PipedriveAddLeadConnector();
    const updateLead = new PipedriveUpdateLeadConnector();
    container.setApplication(app);

    getAllLeads
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getAllLeads);
    addLead
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(addLead);
    updateLead
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(updateLead);
}
