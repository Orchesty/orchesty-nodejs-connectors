import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as TWITTER_GET_FOLLOWERS_BATCH } from '../TwitterGetFollowersBatch';
import { twitterApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for TwitterGetFollowersBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await twitterApp();
  });

  it('process - ok', async () => {
    await tester.testBatch(TWITTER_GET_FOLLOWERS_BATCH);
  });
});
