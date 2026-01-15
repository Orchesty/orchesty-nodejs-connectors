import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
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
