import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as WFLOW_GET_ORGANIZATIONS_CONNECTOR } from '../WflowGetOrganizationsConnector';

let tester: NodeTester;

describe('Tests for WflowGetOrganizationsConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(WFLOW_GET_ORGANIZATIONS_CONNECTOR);
    });
});
