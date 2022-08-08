import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as CLICKUP_CREATE_TASK_CONNECTOR } from '../ClickupCreateTaskConnector';
import { clickupApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for ClickupCreateTaskConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await clickupApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(CLICKUP_CREATE_TASK_CONNECTOR);
  });
});
