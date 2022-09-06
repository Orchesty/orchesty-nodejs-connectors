import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/shopify';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPIFY_GET_SHIPPING_METHODS } from '../ShopifyGetShippingMethods';

let tester: NodeTester;

describe('Tests for ShopifyGetShippingMethods', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(SHOPIFY_GET_SHIPPING_METHODS);
    });
});
