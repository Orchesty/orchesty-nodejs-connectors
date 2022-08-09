import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as GREEN_HOUSE_LIST_CANDIDATES_BATCH } from '../GreenHouseListCandidatesBatch';
import { greenHouseApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for GreenHouseListCandidatesBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await greenHouseApp();
  });

  it('process - ok', async () => {
    await tester.testBatch(GREEN_HOUSE_LIST_CANDIDATES_BATCH);
  });
});