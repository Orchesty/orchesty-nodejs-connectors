import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../test/dataProvider';
import { NAME as RAYNET_CRM_GET_CONTACT_PERSONS } from '../RaynetCRMGetContactPersons';

let tester: NodeTester;

describe('Tests for RaynetCRMGetContactPersons', () => {
    beforeAll(() => {
        init();
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        mock();
        await tester.testBatch(RAYNET_CRM_GET_CONTACT_PERSONS);
    });

    it('process - with email', async () => {
        mock();
        await tester.testBatch(RAYNET_CRM_GET_CONTACT_PERSONS, 'email');
    });
});
