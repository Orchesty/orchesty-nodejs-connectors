import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as MALL_GET_PRODUCT_LIST_BATCH } from '../MallGetProductListBatch';

let tester: NodeTester;

describe('Tests for MallGetProductListBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(MALL_GET_PRODUCT_LIST_BATCH);
    });
});
