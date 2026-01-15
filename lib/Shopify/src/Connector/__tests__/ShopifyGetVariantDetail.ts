import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as SHOPIFY_GET_VARIANT_DETAIL } from '../ShopifyGetVariantDetail';

let tester: NodeTester;

describe('Tests for ShopifyGetVariantDetail', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(SHOPIFY_GET_VARIANT_DETAIL);
    });
});
