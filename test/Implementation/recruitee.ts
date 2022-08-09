import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import RecruiteeApplication, { NAME as RECRUITEE_APP } from '../../lib/Recruitee/RecruiteeApplication';
import { API_TOKEN } from '../../lib/CeskaPosta/CeskaPostaApplication';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import RecruiteeListCandidatesBatch from '../../lib/Recruitee/Batch/RecruiteeListCandidatesBatch';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
  await appInstall(RECRUITEE_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [API_TOKEN]: DEFAULT_ACCESS_TOKEN,
    },
  });

  const app = new RecruiteeApplication();
  container.setApplication(app);

  const listCandidates = new RecruiteeListCandidatesBatch();

  listCandidates
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(listCandidates);
}
