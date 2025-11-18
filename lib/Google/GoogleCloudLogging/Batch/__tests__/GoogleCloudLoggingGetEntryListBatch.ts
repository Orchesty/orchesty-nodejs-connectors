import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../../test/Implementation/google';
import { container } from '../../../../../test/TestAbstract';
import { NAME as GOOGLE_CLOUD_LOGGING_GET_ENTRY_LIST_BATCH } from '../GoogleCloudLoggingGetEntryListBatch';

let tester: NodeTester;

describe('Tests for GoogleCloudLoggingGetEntryListBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(GOOGLE_CLOUD_LOGGING_GET_ENTRY_LIST_BATCH);
    });
});
