import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../test/TestAbstract';
import { NAME as SHOPIFY_ABSOLUTE_UPDATE_STOCK } from '../ShopifyAbsoluteUpdateStock';

let tester: NodeTester;

describe('Tests for ShopifyAbsoluteUpdateStock', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
    });

    it('process - ok', async () => {
        await tester.testConnector(SHOPIFY_ABSOLUTE_UPDATE_STOCK);
    });
});
