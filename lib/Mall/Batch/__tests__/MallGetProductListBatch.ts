import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { mallApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as MALL_GET_PRODUCT_LIST_BATCH } from '../MallGetProductListBatch';

let tester: NodeTester;

describe('Tests for MallGetProductListBatch', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await mallApp();
    });

    it('process - ok', async () => {
        await tester.testBatch(MALL_GET_PRODUCT_LIST_BATCH);
    });
});
