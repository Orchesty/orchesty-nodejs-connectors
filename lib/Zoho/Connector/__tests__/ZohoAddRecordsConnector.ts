import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as ZOHO_ADD_RECORDS_CONNECTOR } from '../ZohoAddRecordsConnector';
import { zohoApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for ZohoAddRecordsConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await zohoApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(ZOHO_ADD_RECORDS_CONNECTOR);
  });

  it('process - error', async () => {
    await tester.testConnector(ZOHO_ADD_RECORDS_CONNECTOR, 'error', Error);
  });
});
