import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as TABLEAU_CREATE_NEW_RESOURCE_CONNECTOR } from '../TableauCreateNewResourceConnector';
import { tableauApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for TableauCreateNewResourceConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await tableauApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(TABLEAU_CREATE_NEW_RESOURCE_CONNECTOR);
  });
});
