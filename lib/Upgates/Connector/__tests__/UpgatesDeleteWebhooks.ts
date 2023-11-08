import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { devIp } from '../../../../.jest/testEnvs';
import { DEFAULT_USER } from '../../../../test/DataProvider';
import { init, mock } from '../../../../test/Implementation/upgates';
import { container } from '../../../../test/TestAbstract';
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
                    url: new RegExp(`http:\\/\\/${devIp}\\/document\\/Webhook.*`),
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
                        webhookId: '1',
                        unsubscribeFailed: false,
                    }],
                },
            },
            {
                request: {
                    url: new RegExp(`http:\\/\\/${devIp}\\/document\\/Webhook.*`),
                    method: HttpMethods.DELETE,
                },
                response: {},
            },
        ]);
        await tester.testConnector(UPGATES_DELETE_WEBHOOKS);
    });
});
