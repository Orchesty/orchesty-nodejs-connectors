import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import SageHrApplication, { API_KEY, NAME as SAGEHR_APP, SUBDOMAIN } from '../../lib/SageHr/SageHrApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';
import SageHrListEmployeesBatch from '../../lib/SageHr/Batch/SageHrListEmployeesBatch';

export default async function init(): Promise<void> {
  await appInstall(SAGEHR_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [SUBDOMAIN]: 'companydomain',
      [API_KEY]: 'Api key',
    },
  });
  const app = new SageHrApplication();

  container.setApplication(app);
  const listEmployees = new SageHrListEmployeesBatch();

  listEmployees
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(listEmployees);
}
