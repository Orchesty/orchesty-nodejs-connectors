import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/shopify';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPIFY_GET_FULFILLMENT_ORDERS } from '../ShopifyGetFulfilmentOrders';

let tester: NodeTester;

describe('Tests for ShopifyGetFulfilmentOrders', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(SHOPIFY_GET_FULFILLMENT_ORDERS);
    });
});
