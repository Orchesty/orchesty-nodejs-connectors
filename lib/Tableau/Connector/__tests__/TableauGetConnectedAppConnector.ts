import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as TABLEAU_GET_CONNECTED_APP_CONNECTOR } from '../TableauGetConnectedAppConnector';
import { tableauApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for TableauGetConnectedAppConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await tableauApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(TABLEAU_GET_CONNECTED_APP_CONNECTOR);
  });
});
