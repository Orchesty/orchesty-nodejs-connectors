import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/shopify';
import { container } from '../../../../test/TestAbstract';
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
