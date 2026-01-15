import { DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import { orchestyOptions } from '@orchesty/nodejs-sdk/dist/lib/Config/Config';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init, { mock } from '../../../test/dataProvider';
import { NAME as OUTLOOK_UNSUBSCRIBE_WEBHOOK } from '../OutlookUnsubscribeWebhook';

let tester: NodeTester;

describe('Tests for OutlookUnsubscribeWebhook', () => {
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

    it('process - ok - id', async () => {
        mock();
        mockOnce([
            {
                request: {
                    url: new RegExp(`${orchestyOptions.workerApi}\\/document\\/Webhook.*`),
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
        await tester.testBatch(OUTLOOK_UNSUBSCRIBE_WEBHOOK, 'id');
    });
});
