import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as WORKABLE_JOBS_BATCH } from '../WorkableJobsBatch';
import init from '../../../../test/Implementation/workable';

let tester: NodeTester;

describe('Tests for WorkableJobsBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await init();
  });

  it('process - ok', async () => {
    await tester.testBatch(WORKABLE_JOBS_BATCH);
  });
});
