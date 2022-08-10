import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as WORKABLE_GET_ACCOUNTS_BATCH } from '../WorkableGetAccountsBatch';
import init from '../../../../test/Implementation/workable';

let tester: NodeTester;

describe('Tests for WorkableGetAccountsBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await init();
  });

  it('process - ok', async () => {
    await tester.testBatch(WORKABLE_GET_ACCOUNTS_BATCH);
  });
});
