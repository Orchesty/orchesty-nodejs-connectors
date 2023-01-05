import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/todoist';
import { container } from '../../../../test/TestAbstract';
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
