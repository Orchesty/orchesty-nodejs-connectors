import {
    appInstall,
    DEFAULT_ACCESS_TOKEN,
    DEFAULT_USER,
} from '@orchesty/nodejs-connectors/test/DataProvider';
import {
    container,
    db,
    sender,
} from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import RecruiteeGetOffersBatch from '../src/Batch/RecruiteeGetOffersBatch';
import RecruiteeListCandidatesBatch from '../src/Batch/RecruiteeListCandidatesBatch';
import RecruiteeApplication, {
    API_TOKEN,
    NAME as RECRUITEE_APP,
    YOUR_COMPANY,
} from '../src/RecruiteeApplication';

export default function init(): void {
    appInstall(RECRUITEE_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [API_TOKEN]: DEFAULT_ACCESS_TOKEN,
            [YOUR_COMPANY]: 'your_company',
        },
    });

    const app = new RecruiteeApplication();
    container.setApplication(app);

    const listCandidates = new RecruiteeListCandidatesBatch();
    const getOffers = new RecruiteeGetOffersBatch();

    listCandidates.setSender(sender).setDb(db).setApplication(app);
    container.setBatch(listCandidates);

    getOffers.setSender(sender).setDb(db).setApplication(app);
    container.setBatch(getOffers);
}
