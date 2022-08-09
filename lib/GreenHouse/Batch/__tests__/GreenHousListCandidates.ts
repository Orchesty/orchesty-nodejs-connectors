import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as GREEN_HOUS_LIST_CANDIDATES } from '../GreenHousListCandidates';
import { greenHousApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for GreenHousListCandidates', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await greenHousApp();
  });

  it('process - ok', async () => {
    await tester.testBatch(GREEN_HOUS_LIST_CANDIDATES);
  });
});
