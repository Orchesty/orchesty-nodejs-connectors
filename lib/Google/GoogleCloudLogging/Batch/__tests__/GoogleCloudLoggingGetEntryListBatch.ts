import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '../../../../../test/DataProvider';
import { container, db, oauth2Provider, prepare, sender } from '../../../../../test/TestAbstract';
import GoogleCloudLoggingApplication, { NAME as GOOGLE_CLOUD_LOGGING_APPLICATION } from '../../GoogleCloudLoggingApplication';
import GoogleCloudLoggingGetEntryListBatch, { NAME as GOOGLE_CLOUD_LOGGING_GET_ENTRY_LIST_BATCH } from '../GoogleCloudLoggingGetEntryListBatch';

let tester: NodeTester;

function init(): void {
    appInstall(GOOGLE_CLOUD_LOGGING_APPLICATION, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [USER]: DEFAULT_USER,
            [PASSWORD]: DEFAULT_PASSWORD,
        },
    });

    prepare();
    const app = new GoogleCloudLoggingApplication(oauth2Provider);
    container.setApplication(app);

    container.setBatch(new GoogleCloudLoggingGetEntryListBatch().setApplication(app).setSender(sender).setDb(db));
}

describe('Tests for GoogleCloudLoggingGetEntryListBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(GOOGLE_CLOUD_LOGGING_GET_ENTRY_LIST_BATCH);
    });
});
