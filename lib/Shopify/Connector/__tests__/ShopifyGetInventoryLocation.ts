import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/shopify';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPIFY_GET_INVENTORY_LOCATION } from '../ShopifyGetInventoryLocation';

let tester: NodeTester;

describe('Tests for ShopifyGetInventoryLocation', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(SHOPIFY_GET_INVENTORY_LOCATION);
    });
});
