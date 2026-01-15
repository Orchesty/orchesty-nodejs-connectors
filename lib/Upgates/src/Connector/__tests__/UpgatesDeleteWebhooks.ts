import { DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import { orchestyOptions } from '@orchesty/nodejs-sdk/dist/lib/Config/Config';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../test/dataProvider';
import { NAME as UPGATES_DELETE_WEBHOOKS } from '../UpgatesDeleteWebhooks';

let tester: NodeTester;

describe('Tests for UpgatesDeleteWebhooks', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        mock();
        mockOnce([
            {
                request: {
                    url: new RegExp(`${orchestyOptions.workerApi}\\/document\\/Webhook.*`),
                    method: HttpMethods.GET,
                },
                response: {
                    body: [
                        {
                            name: 'orders/create',
                            user: DEFAULT_USER,
                            token: 'testToken',
                            node: 'testNode',
                            topology: 'testTopology',
                            application: 'shopify',
                            webhookId: '1',
                            unsubscribeFailed: false,
                        },
                        {
                            name: 'orders/update',
                            user: DEFAULT_USER,
                            token: 'testToken',
                            node: 'testNode',
                            topology: 'testTopology',
                            application: 'shopify',
                            webhookId: '2',
                            unsubscribeFailed: true,
                        },
                    ],
                },
            },
            {
                request: {
                    url: new RegExp(`${orchestyOptions.workerApi}\\/document\\/Webhook.*`),
                    method: HttpMethods.DELETE,
                },
                response: {},
            },
        ]);
        await tester.testConnector(UPGATES_DELETE_WEBHOOKS);
    });
});
