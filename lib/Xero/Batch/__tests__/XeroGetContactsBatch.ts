import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/xero';
import { container } from '../../../../test/TestAbstract';
import { NAME as XERO_GET_CONTACTS_BATCH } from '../XeroGetContactsBatch';

let tester: NodeTester;

describe('Tests for XeroGetContactsBatch', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testBatch(XERO_GET_CONTACTS_BATCH);
    });
});
