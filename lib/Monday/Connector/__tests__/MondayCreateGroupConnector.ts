import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as MONDAY_CREATE_GROUP_CONNECTOR } from '../MondayCreateGroupConnector';
import init from '../../../../test/Implementation/monday';

let tester: NodeTester;

describe('Tests for MondayCreateGroupConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await init();
  });

  it('process - ok', async () => {
    await tester.testConnector(MONDAY_CREATE_GROUP_CONNECTOR);
  });
});
