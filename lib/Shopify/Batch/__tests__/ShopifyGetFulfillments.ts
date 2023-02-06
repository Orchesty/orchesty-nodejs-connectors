import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/shopify';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPIFY_GET_FULFILLMENTS } from '../ShopifyGetFulfillments';

let tester: NodeTester;

describe('Tests for ShopifyGetFulfillments', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(SHOPIFY_GET_FULFILLMENTS);
    });
});
