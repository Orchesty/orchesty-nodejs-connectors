import {
    appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_CLIENT_ID, DEFAULT_CLIENT_SECRET, DEFAULT_USER,
} from '@orchesty/nodejs-connectors/test/DataProvider';
import {
    container, db, oauth2Provider, sender,
} from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import TodoistGetAllProjectsBatch from '../src/Batch/TodoistGetAllProjectsBatch';
import TodoistCreateNewTaskConnector from '../src/Connector/TodoistCreateNewTaskConnector';
import TodoistCreateProjectConnector from '../src/Connector/TodoistCreateProjectConnector';
import TodoistApplication, { NAME as TODOIST_APP } from '../src/TodoistApplication';

export default function init(): void {
    appInstall(TODOIST_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });

    const app = new TodoistApplication(oauth2Provider);
    container.setApplication(app);

    const createProject = new TodoistCreateProjectConnector();
    const getAllProjects = new TodoistGetAllProjectsBatch();
    const createNewTask = new TodoistCreateNewTaskConnector();
    createProject
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createProject);
    getAllProjects
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getAllProjects);
    createNewTask
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createNewTask);
}
