import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as TODOIST_CREATE_NEW_TASK_CONNECTOR } from '../TodoistCreateNewTaskConnector';

let tester: NodeTester;

describe('Tests for TodoistCreateNewTaskConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(TODOIST_CREATE_NEW_TASK_CONNECTOR);
    });
});
