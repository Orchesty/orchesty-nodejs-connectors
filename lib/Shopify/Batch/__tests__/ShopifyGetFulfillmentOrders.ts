import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/shopify';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPIFY_GET_FULFILLMENT_ORDERS } from '../ShopifyGetFulfillmentOrders';

let tester: NodeTester;

describe('Tests for ShopifyGetFulfillmentOrders', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(SHOPIFY_GET_FULFILLMENT_ORDERS);
    });
});
