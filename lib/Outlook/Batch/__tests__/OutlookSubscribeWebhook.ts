import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { devIp } from '../../../../.jest/testEnvs';
import { DEFAULT_USER } from '../../../../test/DataProvider';
import init, { mock } from '../../../../test/Implementation/outlook';
import { container } from '../../../../test/TestAbstract';
import { NAME } from '../../OutlookApplication';
import { NAME as OUTLOOK_SUBSCRIBE_WEBHOOK } from '../OutlookSubscribeWebhook';

let tester: NodeTester;

describe('Tests for OutlookSubscribeWebhook', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        const wh = new Webhook();
        wh
            .setApplication(NAME)
            .setName('test')
            .setNode('webhook')
            .setToken('123')
            .setTopology('test')
            .setUnsubscribeFailed(false)
            .setUser(DEFAULT_USER)
            .setWebhookId('1-1-1-1');

        mock();
        mockOnce([
            {
                request: {
                    method: HttpMethods.GET, url: new RegExp(`http:\\/\\/${devIp}\\/document\\/Webhook.*`),
                },
                response: {
                    code: 200,
                    body: [{ ...wh.toArray() }],
                },
            }]);

        await tester.testBatch(OUTLOOK_SUBSCRIBE_WEBHOOK);
    });
});
