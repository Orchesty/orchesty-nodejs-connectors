import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as TODOIST_GET_ALL_PROJECTS_BATCH } from '../TodoistGetAllProjectsBatch';
import { todoistApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for TodoistGetAllProjectsBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await todoistApp();
  });

  it('process - ok', async () => {
    await tester.testBatch(TODOIST_GET_ALL_PROJECTS_BATCH);
  });
});
