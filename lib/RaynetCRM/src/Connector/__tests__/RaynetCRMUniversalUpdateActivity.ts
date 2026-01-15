import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../test/dataProvider';
import { NAME as RAYNET_CRM_UNIVERSAL_UPDATE_ACTIVITY } from '../RaynetCRMUniversalUpdateActivity';

let tester: NodeTester;

describe('Tests for RaynetCRMUniversalUpdateActivity', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        await tester.testConnector(RAYNET_CRM_UNIVERSAL_UPDATE_ACTIVITY);
    });
});
