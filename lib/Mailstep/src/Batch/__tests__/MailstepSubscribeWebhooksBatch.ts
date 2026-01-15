import { DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import { orchestyOptions } from '@orchesty/nodejs-sdk/dist/lib/Config/Config';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as MAILSTEP_APPLICATION } from '../../MailstepApplication';
import { NAME as MAILSTEP_SUBSCRIBE_WEBHOOKS_BATCH } from '../MailstepSubscribeWebhooksBatch';

let tester: NodeTester;

describe('Tests for MailstepSubscribeWebhooksBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();

        const webhook = new Webhook()
            .setApplication(MAILSTEP_APPLICATION)
            .setName('name')
            .setNode('node')
            .setToken('token')
            .setTopology('topology')
            .setUnsubscribeFailed(false)
            .setUser(DEFAULT_USER)
            .setWebhookId('webhookdId');

        mockOnce([
            {
                request: {
                    method: HttpMethods.GET, url: new RegExp(`${orchestyOptions.workerApi}\\/document\\/Webhook.*`),
                },
                response: {
                    code: 200,
                    body: [{ ...webhook.toArray() }],
                },
            },
        ]);
    });

    it('process - ok', async () => {
        await tester.testBatch(MAILSTEP_SUBSCRIBE_WEBHOOKS_BATCH);
    });
});
