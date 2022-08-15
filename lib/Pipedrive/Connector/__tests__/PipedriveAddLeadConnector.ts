import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { NAME as PIPEDRIVE_ADD_LEAD_CONNECTOR } from '../PipedriveAddLeadConnector';
import { pipedriveApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';

let tester: NodeTester;

describe('Tests for PipedriveAddLeadConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await pipedriveApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(PIPEDRIVE_ADD_LEAD_CONNECTOR);
  });
});
