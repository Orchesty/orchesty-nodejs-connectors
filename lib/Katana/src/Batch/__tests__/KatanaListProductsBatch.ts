import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as KATANA_LIST_PRODUCTS_BATCH } from '../KatanaListProductsBatch';

let tester: NodeTester;

describe('Tests for KatanaListProductsBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(KATANA_LIST_PRODUCTS_BATCH);
    });
});
