import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as TYPEFORM_CREATE_WORKSPACE_CONNECTOR } from '../TypeformCreateWorkspaceConnector';

let tester: NodeTester;

describe('Tests for TypeformCreateWorkspaceConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(TYPEFORM_CREATE_WORKSPACE_CONNECTOR);
    });
});
