import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as GIT_HUB_REPOSITORIES_BATCH } from '../GitHubRepositoriesBatch';
import { gitHubApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for GitHubRepositoriesBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await gitHubApp();
  });

  it('process - ok', async () => {
    await tester.testBatch(GIT_HUB_REPOSITORIES_BATCH);
  });
});
