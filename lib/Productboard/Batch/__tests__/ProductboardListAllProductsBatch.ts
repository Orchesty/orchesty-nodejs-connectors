import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/productboard';
import { container } from '../../../../test/TestAbstract';
import { NAME as PRODUCTBOARD_LIST_ALL_PRODUCTS_BATCH } from '../ProductboardListAllProductsBatch';

let tester: NodeTester;

describe('Tests for ProductboardListAllProductsBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(PRODUCTBOARD_LIST_ALL_PRODUCTS_BATCH);
    });
});
