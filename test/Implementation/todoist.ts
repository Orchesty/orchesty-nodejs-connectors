import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import TodoistApplication, { NAME as TODOIST_APP } from '../../lib/Todoist/TodoistApplication';
import {
  appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_CLIENT_ID, DEFAULT_CLIENT_SECRET, DEFAULT_USER,
} from '../DataProvider';
import TodoistCreateProjectConnector from '../../lib/Todoist/Connector/TodoistCreateProjectConnector';
import TodoistGetAllProjectsBatch from '../../lib/Todoist/Batch/TodoistGetAllProjectsBatch';
import TodoistCreateNewTaskConnector from '../../lib/Todoist/Connector/TodoistCreateNewTaskConnector';
import {
  container, db, oauth2Provider, sender,
} from '../TestAbstract';

export default async function init(): Promise<void> {
  await appInstall(TODOIST_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
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
