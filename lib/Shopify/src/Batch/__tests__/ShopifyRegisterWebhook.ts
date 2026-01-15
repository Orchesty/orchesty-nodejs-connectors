import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as SHOPIFY_REGISTER_WEBHOOK } from '../ShopifyRegisterWebhook';

let tester: NodeTester;

describe('Tests for ShopifyRegisterWebhook', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(SHOPIFY_REGISTER_WEBHOOK);
    });
});
