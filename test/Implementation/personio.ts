import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import PersonioGetProjectsBatch from '../../lib/Personio/Batch/PersonioGetProjectsBatch';
import PersonioListEmployeesBatch from '../../lib/Personio/Batch/PersonioListEmployeesBatch';
import PersonioApplication, { NAME } from '../../lib/Personio/PersonioApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import {
    container, db, sender,
} from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(NAME, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: 'client_id',
            [CLIENT_SECRET]: 'client_secret',
        },
    });

    const app = new PersonioApplication(sender);
    container.setApplication(app);

    const listEmployees = new PersonioListEmployeesBatch();
    const getProjects = new PersonioGetProjectsBatch();

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
