import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import GreenHouseListAppBatch from '../src/Batch/GreenHouseListAppBatch';
import GreenHouseListCandidatesBatch from '../src/Batch/GreenHouseListCandidatesBatch';
import GreenHouseAddCandidateConnector from '../src/Connector/GreenHouseAddCandidateConnector';
import GreenHouseApplication, { NAME as GREENHOUS_APP, USERNAME } from '../src/GreenHouseApplication';

export default function init(): void {
    appInstall(GREENHOUS_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
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
