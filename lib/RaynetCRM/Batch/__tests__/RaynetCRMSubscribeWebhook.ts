import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/raynetCRM';
import { container } from '../../../../test/TestAbstract';
import { NAME as RAYNET_CRM_SUBSCRIBE_WEBHOOK } from '../RaynetCRMSubscribeWebhook';

let tester: NodeTester;

describe('Tests for RaynetCRMSubscribeWebhook', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        await tester.testBatch(RAYNET_CRM_SUBSCRIBE_WEBHOOK);
    });
});
