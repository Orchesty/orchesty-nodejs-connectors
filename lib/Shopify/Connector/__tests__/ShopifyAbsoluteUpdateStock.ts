import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/shopify';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPIFY_ABSOLUTE_UPDATE_STOCK } from '../ShopifyAbsoluteUpdateStock';

let tester: NodeTester;

describe('Tests for ShopifyAbsoluteUpdateStock', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(SHOPIFY_ABSOLUTE_UPDATE_STOCK);
    });
});
