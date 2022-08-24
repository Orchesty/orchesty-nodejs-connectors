import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { typeformApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as TYPEFORM_CREATE_WORKSPACE_CONNECTOR } from '../TypeformCreateWorkspaceConnector';

let tester: NodeTester;

describe('Tests for TypeformCreateWorkspaceConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await typeformApp();
    });

    it('process - ok', async () => {
        await tester.testConnector(TYPEFORM_CREATE_WORKSPACE_CONNECTOR);
    });
});
