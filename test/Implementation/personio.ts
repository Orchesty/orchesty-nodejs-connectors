import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import {
  container, db, sender,
} from '../TestAbstract';
import PersonioApplication, { NAME } from '../../lib/Personio/PersonioApplication';
import PersonioListEmployeesBatch from '../../lib/Personio/Batch/PersonioListEmployeesBatch';
import PersonioGetProjectsBatch from '../../lib/Personio/Batch/PersonioGetProjectsBatch';

export default async function init(): Promise<void> {
  await appInstall(NAME, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
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
