import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { NAME as PIPEDRIVE_UPDATE_LEAD_CONNECTOR } from '../PipedriveUpdateLeadConnector';
import { container } from '../../../../test/TestAbstract';
import { pipedriveApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for PipedriveUpdateLeadConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await pipedriveApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(PIPEDRIVE_UPDATE_LEAD_CONNECTOR);
  });
});
