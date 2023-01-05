import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/intercom';
import { container } from '../../../../test/TestAbstract';
import { NAME as INTERCOM_LIST_ALL_CONTACTS_BATCH } from '../IntercomListAllContactsBatch';

let tester: NodeTester;

describe('Tests for IntercomListAllContactsBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(INTERCOM_LIST_ALL_CONTACTS_BATCH);
    });
});
