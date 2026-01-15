import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import {
    container, db, sender,
} from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import WorkableGetAccountsBatch from '../src/Batch/WorkableGetAccountsBatch';
import WorkableJobsBatch from '../src/Batch/WorkableJobsBatch';
import WorkableApplication, { NAME, SUBDOMAIN } from '../src/WorkableApplication';

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
