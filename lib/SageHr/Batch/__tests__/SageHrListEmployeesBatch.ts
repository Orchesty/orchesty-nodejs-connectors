import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as SAGE_HR_LIST_EMPLOYEES_BATCH } from '../SageHrListEmployeesBatch';
import init from '../../../../test/Implementation/sagehr';

let tester: NodeTester;

describe('Tests for SageHrListEmployeesBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await init();
  });

  it('process - ok', async () => {
    await tester.testBatch(SAGE_HR_LIST_EMPLOYEES_BATCH);
  });
});
