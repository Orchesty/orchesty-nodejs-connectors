import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { devIp } from '../../../../.jest/testEnvs';
import { DEFAULT_USER } from '../../../../test/DataProvider';
import init, { mock } from '../../../../test/Implementation/brani';
import { container } from '../../../../test/TestAbstract';
import { NAME as BRANI_SUBSCRIBE_WEBHOOKS } from '../BraniSubscribeWebhooks';

let tester: NodeTester;

describe('Tests for BraniSubscribeWebhooks', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();

        const wh = new Webhook();
        wh
            .setApplication(BRANI_SUBSCRIBE_WEBHOOKS)
            .setName('status_change')
            .setNode('start')
            .setToken('123')
            .setTopology('example-topology')
            .setUnsubscribeFailed(false)
            .setUser(DEFAULT_USER)
            .setWebhookId('n/a');

        mockOnce([
            {
                request: {
                    method: HttpMethods.GET, url: new RegExp(`http:\\/\\/${devIp}\\/document\\/Webhook.*`),
                },
                response: {
                    code: 200,
                    body: [],
                },
            }]);
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
    });

    it('process - ok', async () => {
        await tester.testBatch(BRANI_SUBSCRIBE_WEBHOOKS);
    });
});
