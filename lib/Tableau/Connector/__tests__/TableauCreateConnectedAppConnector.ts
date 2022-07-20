import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../test/TestAbstract';
import { NAME as TABLEAU_CREATE_CONNECTED_APP_CONNECTOR } from '../TableauCreateConnectedAppConnector';

let tester: NodeTester;

describe('Tests for TableauCreateConnectedAppConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
  });

  it('process - ok', async () => {
    await tester.testConnector(TABLEAU_CREATE_CONNECTED_APP_CONNECTOR);
  });
});
