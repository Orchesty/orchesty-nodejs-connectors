import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/raynetCRM';
import { container } from '../../../../test/TestAbstract';
import { NAME as RAYNET_CRM_UNIVERSAL_CREATE_ACTIVITIES } from '../RaynetCRMUniversalCreateActivities';

let tester: NodeTester;

describe('Tests for RaynetCRMUniversalCreateActivities', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        await tester.testConnector(RAYNET_CRM_UNIVERSAL_CREATE_ACTIVITIES);
    });
});
