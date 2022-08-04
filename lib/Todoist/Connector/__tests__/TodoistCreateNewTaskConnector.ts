import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as TODOIST_CREATE_NEW_TASK_CONNECTOR } from '../TodoistCreateNewTaskConnector';
import { todoistApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for TodoistCreateNewTaskConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await todoistApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(TODOIST_CREATE_NEW_TASK_CONNECTOR);
  });
});
