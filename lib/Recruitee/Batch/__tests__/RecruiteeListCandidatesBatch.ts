import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as RECRUITEE_LIST_CANDIDATES_BATCH } from '../RecruiteeListCandidatesBatch';
import init from '../../../../test/Implementation/recruitee';

let tester: NodeTester;

describe('Tests for RecruiteeListCandidatesBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await init();
  });

  it('process - ok', async () => {
    await tester.testBatch(RECRUITEE_LIST_CANDIDATES_BATCH);
  });
});