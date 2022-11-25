import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/shopify';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPIFY_GET_CARRIER_SERVICES } from '../ShopifyGetCarrierServices';

let tester: NodeTester;

describe('Tests for ShopifyGetCarrierServices', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(SHOPIFY_GET_CARRIER_SERVICES);
    });
});
