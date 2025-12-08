import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import PipedriveGetAllLeadsBatch from '../../lib/Pipedrive/Batch/PipedriveGetAllLeadsBatch';
import PipedriveGetAllNotesBatch from '../../lib/Pipedrive/Batch/PipedriveGetAllNotesBatch';
import PipedriveAddLeadConnector from '../../lib/Pipedrive/Connector/PipedriveAddLeadConnector';
import PipedriveAddNoteConnector from '../../lib/Pipedrive/Connector/PipedriveAddNoteConnector';
import PipedriveDeleteLeadConnector from '../../lib/Pipedrive/Connector/PipedriveDeleteLeadConnector';
import PipedriveDeleteNoteConnector from '../../lib/Pipedrive/Connector/PipedriveDeleteNoteConnector';
import PipedriveGetLeadConnector from '../../lib/Pipedrive/Connector/PipedriveGetLeadConnector';
import PipedriveGetNoteConnector from '../../lib/Pipedrive/Connector/PipedriveGetNoteConnector';
import PipedriveUpdateLeadConnector from '../../lib/Pipedrive/Connector/PipedriveUpdateLeadConnector';
import PipedriveUpdateNoteConnector from '../../lib/Pipedrive/Connector/PipedriveUpdateNoteConnector';
import PipedriveApplication, { NAME as PIPEDRIVE_APP, SUBDOMAIN } from '../../lib/Pipedrive/PipedriveApplication';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default function init(): void {
    appInstall(PIPEDRIVE_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [SUBDOMAIN]: 'company',
            [TOKEN]: DEFAULT_ACCESS_TOKEN,
        },
    });
    appInstall(PIPEDRIVE_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [SUBDOMAIN]: 'company',
            [TOKEN]: DEFAULT_ACCESS_TOKEN,
        },
    });

    const app = new PipedriveApplication();
    const getAllLeads = new PipedriveGetAllLeadsBatch();
    const addLead = new PipedriveAddLeadConnector();
    const updateLead = new PipedriveUpdateLeadConnector();
    const getLead = new PipedriveGetLeadConnector();
    const deleteLead = new PipedriveDeleteLeadConnector();
    const getAllNotes = new PipedriveGetAllNotesBatch();
    const addNote = new PipedriveAddNoteConnector();
    const updateNote = new PipedriveUpdateNoteConnector();
    const deleteNote = new PipedriveDeleteNoteConnector();
    const getNote = new PipedriveGetNoteConnector();
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
    getLead
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getLead);
    deleteLead
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(deleteLead);
    getAllNotes
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getAllNotes);
    addNote
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(addNote);
    updateNote
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(updateNote);
    deleteNote
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(deleteNote);
    getNote
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getNote);
}
