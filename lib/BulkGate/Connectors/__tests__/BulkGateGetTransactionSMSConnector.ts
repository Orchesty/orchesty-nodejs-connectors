import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as BULK_GATE_GET_TRANSACTION_SMS_CONNECTOR } from '../BulkGateGetTransactionSMSConnector';
import { bulkGateApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for BulkGateGetTransactionSMSConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await bulkGateApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(BULK_GATE_GET_TRANSACTION_SMS_CONNECTOR);
  });
});