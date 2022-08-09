import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as MONDAY_CREATE_BOARD } from '../MondayCreateBoardConnector';
import { mondayApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for MondayCreateBoardConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await mondayApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(MONDAY_CREATE_BOARD);
  });
});