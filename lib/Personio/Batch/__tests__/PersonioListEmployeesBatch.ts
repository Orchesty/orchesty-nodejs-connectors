import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as PERSONIO_LIST_EMPLOYEES_BATCH } from '../PersonioListEmployeesBatch';
import init from '../../../../test/Implementation/personio';

let tester: NodeTester;

describe('Tests for PersonioListEmployeesBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await init();
  });

  it('process - ok', async () => {
    await tester.testBatch(PERSONIO_LIST_EMPLOYEES_BATCH);
  });
});
