import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import RecruiteeApplication, { NAME as RECRUITEE_APP, YOUR_COMPANY } from '../../lib/Recruitee/RecruiteeApplication';
import { API_TOKEN } from '../../lib/Recruitee/RecruiteeApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import RecruiteeListCandidatesBatch from '../../lib/Recruitee/Batch/RecruiteeListCandidatesBatch';
import { container, db, sender } from '../TestAbstract';
import RecruiteeGetOffersBatch from '../../lib/Recruitee/Batch/RecruiteeGetOffersBatch';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';

export default async function init(): Promise<void> {
  await appInstall(RECRUITEE_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [API_TOKEN]: ACCESS_TOKEN,
      [YOUR_COMPANY]: 'your_company',
    },
  });

  const app = new RecruiteeApplication();
  container.setApplication(app);

  const listCandidates = new RecruiteeListCandidatesBatch();
  const getOffers = new RecruiteeGetOffersBatch();

  listCandidates
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(listCandidates);

  getOffers
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(getOffers);
}
