import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as TODOIST_GET_ALL_PROJECTS_BATCH } from '../TodoistGetAllProjectsBatch';

let tester: NodeTester;

describe('Tests for TodoistGetAllProjectsBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(TODOIST_GET_ALL_PROJECTS_BATCH);
    });
});
