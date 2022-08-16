import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import HumaansApplication, { NAME as HUMAANS_APP, APPLICATION_TOKEN } from '../../lib/Humaans/HumaansApplication';
import { container, db, sender } from '../TestAbstract';
import HumaansListCompaniesBatch from '../../lib/Humaans/Batch/HumaansListCompaniesBatch';
import HumaansListPeopleBatch from '../../lib/Humaans/Batch/HumaansListPeopleBatch';

export default async function init(): Promise<void> {
  await appInstall(HUMAANS_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [APPLICATION_TOKEN]: 'Api key',
    },
  });
  const app = new HumaansApplication();
  container.setApplication(app);

  const listCompany = new HumaansListCompaniesBatch();
  const listPeople = new HumaansListPeopleBatch();

  listCompany
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(listCompany);

  listPeople
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(listPeople);
}
