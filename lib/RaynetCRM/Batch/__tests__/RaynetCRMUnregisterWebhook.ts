import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { devIp } from '../../../../.jest/testEnvs';
import { DEFAULT_USER } from '../../../../test/DataProvider';
import { init, mock } from '../../../../test/Implementation/raynetCRM';
import { container } from '../../../../test/TestAbstract';
import { NAME as RAYNET_CRM_UNREGISTER_WEBHOOK } from '../RaynetCRMUnregisterWebhook';

let tester: NodeTester;

describe('Tests for RaynetCRMUnregisterWebhook', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        mockOnce([
            {
                request: {
                    url: new RegExp(`http:\\/\\/${devIp}\\/document\\/Webhook.*`),
                    method: HttpMethods.GET,
                },
                response: {
                    body: [{
                        name: 'record.created',
                        user: DEFAULT_USER,
                        token: 'testToken',
                        node: 'testNode',
                        topology: 'testTopology',
                        application: 'raynet',
                        webhookId: '1',
                        unsubscribeFailed: false,
                    }],
                },
            },
        ]);
        await tester.testBatch(RAYNET_CRM_UNREGISTER_WEBHOOK);
    });
});
