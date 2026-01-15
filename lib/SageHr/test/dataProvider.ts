import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import SageHrGetProjectsBatch from '../src/Batch/SageHrGetProjectsBatch';
import SageHrListEmployeesBatch from '../src/Batch/SageHrListEmployeesBatch';
import SageHrApplication, { API_KEY, NAME as SAGEHR_APP, SUBDOMAIN } from '../src/SageHrApplication';

export default function init(): void {
    appInstall(SAGEHR_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [SUBDOMAIN]: 'companydomain',
            [API_KEY]: 'Api key',
        },
    });
    const app = new SageHrApplication();

    container.setApplication(app);
    const listEmployees = new SageHrListEmployeesBatch();
    const getProjects = new SageHrGetProjectsBatch();
    listEmployees
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(listEmployees);
    getProjects
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getProjects);
}
