import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import WorkableGetAccountsBatch from '../../lib/Workable/Batch/WorkableGetAccountsBatch';
import WorkableJobsBatch from '../../lib/Workable/Batch/WorkableJobsBatch';
import WorkableApplication, { NAME, SUBDOMAIN } from '../../lib/Workable/WorkableApplication';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import {
    container, db, sender,
} from '../TestAbstract';

export default function init(): void {
    appInstall(NAME, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            [SUBDOMAIN]: 'hb-6',
        },
    });

    const app = new WorkableApplication();
    container.setApplication(app);

    const jobs = new WorkableJobsBatch();
    const getAccounts = new WorkableGetAccountsBatch();

    jobs
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(jobs);

    getAccounts
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getAccounts);
}
