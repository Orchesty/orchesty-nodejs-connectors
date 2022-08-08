import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../test/TestAbstract';
import { NAME as MONDAY_CREATE_BOARD } from '../MondayCreateBoard';

let tester: NodeTester;

describe('Tests for MondayCreateBoard', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
  });

  it('process - ok', async () => {
    await tester.testConnector(MONDAY_CREATE_BOARD);
  });
});
