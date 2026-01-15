import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import PipedriveGetAllLeadsBatch from '../src/Batch/PipedriveGetAllLeadsBatch';
import PipedriveGetAllNotesBatch from '../src/Batch/PipedriveGetAllNotesBatch';
import PipedriveAddLeadConnector from '../src/Connector/PipedriveAddLeadConnector';
import PipedriveAddNoteConnector from '../src/Connector/PipedriveAddNoteConnector';
import PipedriveDeleteLeadConnector from '../src/Connector/PipedriveDeleteLeadConnector';
import PipedriveDeleteNoteConnector from '../src/Connector/PipedriveDeleteNoteConnector';
import PipedriveGetLeadConnector from '../src/Connector/PipedriveGetLeadConnector';
import PipedriveGetNoteConnector from '../src/Connector/PipedriveGetNoteConnector';
import PipedriveUpdateLeadConnector from '../src/Connector/PipedriveUpdateLeadConnector';
import PipedriveUpdateNoteConnector from '../src/Connector/PipedriveUpdateNoteConnector';
import PipedriveApplication, { NAME as PIPEDRIVE_APP, SUBDOMAIN } from '../src/PipedriveApplication';

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
