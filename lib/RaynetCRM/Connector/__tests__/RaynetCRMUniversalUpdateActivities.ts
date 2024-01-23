import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/raynetCRM';
import { container } from '../../../../test/TestAbstract';
import { NAME as RAYNET_CRM_UNIVERSAL_UPDATE_ACTIVITIES } from '../RaynetCRMUniversalUpdateActivities';

let tester: NodeTester;

describe('Tests for RaynetCRMUniversalUpdateActivities', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        await tester.testConnector(RAYNET_CRM_UNIVERSAL_UPDATE_ACTIVITIES);
    });
});
