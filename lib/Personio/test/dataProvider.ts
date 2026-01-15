import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import PersonioGetProjectsBatch from '../src/Batch/PersonioGetProjectsBatch';
import PersonioListEmployeesBatch from '../src/Batch/PersonioListEmployeesBatch';
import PersonioApplication, { NAME } from '../src/PersonioApplication';

export default function init(): void {
    appInstall(NAME, DEFAULT_USER, {
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
