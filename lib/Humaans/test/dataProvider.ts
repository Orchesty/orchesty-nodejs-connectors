import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import HumaansListCompaniesBatch from '../src/Batch/HumaansListCompaniesBatch';
import HumaansListPeopleBatch from '../src/Batch/HumaansListPeopleBatch';
import HumaansApplication, { APPLICATION_TOKEN, NAME as HUMAANS_APP } from '../src/HumaansApplication';

export default function init(): void {
    appInstall(HUMAANS_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [APPLICATION_TOKEN]: DEFAULT_ACCESS_TOKEN,
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
