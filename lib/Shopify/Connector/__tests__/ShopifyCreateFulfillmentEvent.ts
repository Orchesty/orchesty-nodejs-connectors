import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/shopify';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPIFY_CREATE_FULFILLMENT_EVENT } from '../ShopifyCreateFulfillmentEvent';

let tester: NodeTester;

describe('Tests for ShopifyCreateFulfillmentEvent', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(SHOPIFY_CREATE_FULFILLMENT_EVENT);
    });
});
