import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/raynetCRM';
import { container } from '../../../../test/TestAbstract';
import { NAME as RAYNET_CRM_GET_CLIENTS } from '../RaynetCRMGetClients';

let tester: NodeTester;

describe('Tests for RaynetCRMGetClients', () => {
    beforeAll(() => {
        init();
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        mock();
        await tester.testBatch(RAYNET_CRM_GET_CLIENTS);
    });

    it('process - with email', async () => {
        mock();
        await tester.testBatch(RAYNET_CRM_GET_CLIENTS, 'email');
    });
});
