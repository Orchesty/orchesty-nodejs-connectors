import { DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import { orchestyOptions } from '@orchesty/nodejs-sdk/dist/lib/Config/Config';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as SHOPIFY_UNREGISTER_WEBHOOK } from '../ShopifyUnregisterWebhook';

let tester: NodeTester;

describe('Tests for ShopifyUnregisterWebhook', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        mockOnce([
            {
                request: {
                    url: new RegExp(`${orchestyOptions.workerApi}\\/document\\/Webhook.*`),
                    method: HttpMethods.GET,
                },
                response: {
                    body: [{
                        name: 'orders/create',
                        user: DEFAULT_USER,
                        token: 'testToken',
                        node: 'testNode',
                        topology: 'testTopology',
                        application: 'shopify',
                        webhookId: '4455555555',
                        unsubscribeFailed: false,
                    }],
                },
            },
            {
                request: {
                    url: new RegExp(`${orchestyOptions.workerApi}\\/document\\/Webhook.*`),
                    method: HttpMethods.DELETE,
                },
                response: {
                },
            },
        ]);
        await tester.testBatch(SHOPIFY_UNREGISTER_WEBHOOK);
    });
});
