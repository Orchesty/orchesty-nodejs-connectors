import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { devIp } from '../../../../.jest/testEnvs';
import { DEFAULT_USER } from '../../../../test/DataProvider';
import init from '../../../../test/Implementation/fapi';
import { container } from '../../../../test/TestAbstract';
import { NAME as FAPI_APPLICATION } from '../../FapiApplication';
import { NAME as FAPI_UNSUBSCRIBE_WEBHOOKS_BATCH } from '../FapiUnsubscribeWebhooksBatch';

let tester: NodeTester;

describe('Tests for FapiUnsubscribeWebhooksBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();

        const webhook = new Webhook()
            .setApplication(FAPI_APPLICATION)
            .setName('name')
            .setNode('node')
            .setToken('token')
            .setTopology('topology')
            .setUnsubscribeFailed(false)
            .setUser(DEFAULT_USER)
            .setWebhookId('webhookId');

        mockOnce([
            {
                request: {
                    method: HttpMethods.GET, url: new RegExp(`http:\\/\\/${devIp}\\/document\\/Webhook.*`),
                },
                response: {
                    code: 200,
                    body: [{ ...webhook.toArray() }],
                },
            },
        ]);

        mockOnce([
            {
                request: {
                    method: HttpMethods.GET, url: new RegExp(`http:\\/\\/${devIp}\\/document\\/Webhook.*`),
                },
                response: {
                    code: 200,
                    body: [],
                },
            },
        ]);
    });

    it('process - ok', async () => {
        await tester.testBatch(FAPI_UNSUBSCRIBE_WEBHOOKS_BATCH);
    });
});
