import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as SHOPIFY_CREATE_FULFILLMENT } from '../ShopifyCreateFulfillment';

let tester: NodeTester;

describe('Tests for ShopifyCreateFulfillment', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(SHOPIFY_CREATE_FULFILLMENT);
    });
});
