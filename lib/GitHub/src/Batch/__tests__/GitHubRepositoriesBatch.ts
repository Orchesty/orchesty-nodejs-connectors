import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as GIT_HUB_REPOSITORIES_BATCH } from '../GitHubRepositoriesBatch';

let tester: NodeTester;

describe('Tests for GitHubRepositoriesBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(GIT_HUB_REPOSITORIES_BATCH);
    });
});
