import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/raynetCRM';
import { container } from '../../../../test/TestAbstract';
import { NAME as RAYNET_CRM_GET_VOIP_BY_TEL } from '../RaynetCRMGetVoipByTel';

let tester: NodeTester;

describe('Tests for RaynetCRMGetVoipByTel', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        await tester.testConnector(RAYNET_CRM_GET_VOIP_BY_TEL);
    });
});
