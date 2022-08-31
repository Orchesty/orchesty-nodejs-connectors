import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import RecruiteeGetOffersBatch from '../../lib/Recruitee/Batch/RecruiteeGetOffersBatch';
import RecruiteeListCandidatesBatch from '../../lib/Recruitee/Batch/RecruiteeListCandidatesBatch';
import
RecruiteeApplication, { API_TOKEN, NAME as RECRUITEE_APP, YOUR_COMPANY }
    from '../../lib/Recruitee/RecruiteeApplication';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(RECRUITEE_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [API_TOKEN]: DEFAULT_ACCESS_TOKEN,
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
