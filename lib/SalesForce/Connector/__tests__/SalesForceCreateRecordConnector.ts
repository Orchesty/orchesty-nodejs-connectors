import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as SALESFORCE_CREATE_RECORD_CONNECTOR } from '../SalesForceCreateRecordConnector';
import init from '../../../../test/Implementation/salesforce';

let tester: NodeTester;

describe('Tests for SalesForceCreateRecord', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, false, ['']);
    await init();
  });

  it('process - ok', async () => {
    await tester.testConnector(SALESFORCE_CREATE_RECORD_CONNECTOR, '');
  });
});
