import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as ZOHO_GET_RECORDS_CONNECTOR } from '../ZohoGetRecordsConnector';
import init from '../../../../test/Implementation/zoho';

let tester: NodeTester;

describe('Tests for ZohoGetRecordsConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await init();
  });

  it('process - ok', async () => {
    await tester.testConnector(ZOHO_GET_RECORDS_CONNECTOR);
  });

//   it('process - error', async () => {
//     await tester.testConnector(ZOHO_GET_RECORDS_CONNECTOR, 'error', Error);
//   });
});
