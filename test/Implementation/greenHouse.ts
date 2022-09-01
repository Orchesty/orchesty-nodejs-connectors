import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { PASSWORD } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import GreenHouseListAppBatch from '../../lib/GreenHouse/Batch/GreenHouseListAppBatch';
import GreenHouseListCandidatesBatch from '../../lib/GreenHouse/Batch/GreenHouseListCandidatesBatch';
import GreenHouseAddCandidateConnector from '../../lib/GreenHouse/Connector/GreenHouseAddCandidateConnector';
import GreenHouseApplication, { NAME as GREENHOUS_APP, USERNAME } from '../../lib/GreenHouse/GreenHouseApplication';
import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(GREENHOUS_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [USERNAME]: DEFAULT_USER,
            [PASSWORD]: DEFAULT_PASSWORD,
        },
    });

    const app = new GreenHouseApplication();
    container.setApplication(app);

    const listApp = new GreenHouseListAppBatch();
    const listCandidates = new GreenHouseListCandidatesBatch();
    const addCandidates = new GreenHouseAddCandidateConnector();

    listApp
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(listApp);

    listCandidates
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(listCandidates);

    addCandidates
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(addCandidates);
}
