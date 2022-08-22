import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as TYPEFORM_CREATE_WORKSPACE_CONNECTOR } from '../TypeformCreateWorkspaceConnector';
import init from '../../../../test/Implementation/typeform';

let tester: NodeTester;

describe('Tests for TypeformCreateWorkspaceConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await init();
  });

  it('process - ok', async () => {
    await tester.testConnector(TYPEFORM_CREATE_WORKSPACE_CONNECTOR);
  });
});
