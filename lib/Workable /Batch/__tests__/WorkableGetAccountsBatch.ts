import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/workable';
import { container } from '../../../../test/TestAbstract';
import { NAME as WORKABLE_GET_ACCOUNTS_BATCH } from '../WorkableGetAccountsBatch';

let tester: NodeTester;

describe('Tests for WorkableGetAccountsBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(WORKABLE_GET_ACCOUNTS_BATCH);
    });
});
