import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/raynetCRM';
import { container } from '../../../../test/TestAbstract';
import { NAME as RAYNET_CRM_GET_ACTIVITIES } from '../RaynetCRMGetActivities';

let tester: NodeTester;

describe('Tests for RaynetCRMGetActivities', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        await tester.testBatch(RAYNET_CRM_GET_ACTIVITIES);
    });
});
