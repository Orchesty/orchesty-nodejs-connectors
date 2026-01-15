import { DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import { orchestyOptions } from '@orchesty/nodejs-sdk/dist/lib/Config/Config';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../test/dataProvider';
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
                    url: new RegExp(`${orchestyOptions.workerApi}\\/document\\/Webhook.*`),
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
