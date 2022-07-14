import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as SALESFORCE_UPDATE_RECORD_CONNECTOR } from '../SalesForceUpdateRecordConnector';
import { salesforceAPP } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for SalesForceUpdateRecord', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await salesforceAPP();
  });

  it('process - ok', async () => {
    await tester.testConnector(SALESFORCE_UPDATE_RECORD_CONNECTOR);
  });
});
