import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../test/TestAbstract';
import { NAME as TABLEAU_CREATE_NEW_RESOURCE_CONNECTOR } from '../TableauCreateNewResourceConnector';

let tester: NodeTester;

describe('Tests for TableauCreateNewResourceConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
  });

  it('process - ok', async () => {
    await tester.testConnector(TABLEAU_CREATE_NEW_RESOURCE_CONNECTOR);
  });
});
