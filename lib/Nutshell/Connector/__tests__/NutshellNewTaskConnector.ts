import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as NUTSHELL_NEW_TASK_CONNECTOR } from '../NutshellNewTaskConnector';
import { nutshellApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for NutshellNewTaskConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await nutshellApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(NUTSHELL_NEW_TASK_CONNECTOR);
  });
});
