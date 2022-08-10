import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as RECRUITEE_GET_OFFERS_BATCH } from '../RecruiteeGetOffersBatch';
import init from '../../../../test/Implementation/recruitee';

let tester: NodeTester;

describe('Tests for RecruiteeGetOffersBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await init();
  });

  it('process - ok', async () => {
    await tester.testBatch(RECRUITEE_GET_OFFERS_BATCH);
  });
});
