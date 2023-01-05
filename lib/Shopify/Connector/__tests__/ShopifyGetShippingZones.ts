import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/shopify';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPIFY_GET_SHIPPING_ZONES } from '../ShopifyGetShippingZones';

let tester: NodeTester;

describe('Tests for ShopifyGetShippingZones', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(SHOPIFY_GET_SHIPPING_ZONES);
    });
});
