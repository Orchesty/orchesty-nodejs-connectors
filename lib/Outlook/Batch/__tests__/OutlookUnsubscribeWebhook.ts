import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { devIp } from '../../../../.jest/testEnvs';
import { DEFAULT_USER } from '../../../../test/DataProvider';
import init from '../../../../test/Implementation/outlook';
import { container } from '../../../../test/TestAbstract';
import { NAME as OUTLOOK_UNSUBSCRIBE_WEBHOOK } from '../OutlookUnsubscribeWebhook';

let tester: NodeTester;

describe('Tests for OutlookUnsubscribeWebhook', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mockOnce([
            {
                request: {
                    url: new RegExp(`http:\\/\\/${devIp}\\/document\\/Webhook.*`),
                    method: HttpMethods.GET,
                },
                response: {
                    body: [{
                        name: 'me/events',
                        user: DEFAULT_USER,
                        token: 'testToken',
                        node: 'webhook',
                        topology: 'testTopology',
                        application: 'outlook',
                        webhookId: '1',
                        unsubscribeFailed: false,
                    }],
                },
            },
        ]);
        await tester.testBatch(OUTLOOK_UNSUBSCRIBE_WEBHOOK);
    });
});
