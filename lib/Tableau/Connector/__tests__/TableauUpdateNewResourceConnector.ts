import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as TABLEAU_UPDATE_NEW_RESOURCE_CONNECTOR } from '../TableauUpdateNewResourceConnector';

let tester: NodeTester;

describe('Tests for TableauUpdateNewResourceConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
  });

  it('process - ok', async () => {
    await tester.testConnector(TABLEAU_UPDATE_NEW_RESOURCE_CONNECTOR);
  });
});
