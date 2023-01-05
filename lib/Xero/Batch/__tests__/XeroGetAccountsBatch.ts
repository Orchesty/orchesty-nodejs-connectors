import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/xero';
import { container } from '../../../../test/TestAbstract';
import { NAME as XERO_GET_ACCOUNTS_BATCH } from '../XeroGetAccountsBatch';

let tester: NodeTester;

describe('Tests for XeroGetAccountsBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        mock();
        await tester.testBatch(XERO_GET_ACCOUNTS_BATCH);
    });
});
