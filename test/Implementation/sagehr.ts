import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import SageHrGetProjectsBatch from '../../lib/SageHr/Batch/SageHrGetProjectsBatch';
import SageHrListEmployeesBatch from '../../lib/SageHr/Batch/SageHrListEmployeesBatch';
import SageHrApplication, { API_KEY, NAME as SAGEHR_APP, SUBDOMAIN } from '../../lib/SageHr/SageHrApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(SAGEHR_APP, DEFAULT_USER, {
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
