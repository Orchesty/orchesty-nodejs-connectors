import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { NAME as PIPEDRIVE_GET_ALL_LEADS_BATCH } from '../PipedriveGetAllLeadsBatch';
import { pipedriveApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';

let tester: NodeTester;

describe('Tests for PipedriveGetAllLeadsBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await pipedriveApp();
  });

  it('process - ok', async () => {
    await tester.testBatch(PIPEDRIVE_GET_ALL_LEADS_BATCH);
  });
});