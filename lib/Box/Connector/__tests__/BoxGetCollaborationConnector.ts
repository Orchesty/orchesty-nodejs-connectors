import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as BOX_GET_COLLABORATION_CONNECTOR } from '../BoxGetCollaborationConnector';
import { boxApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for BoxGetCollaborationConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await boxApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(BOX_GET_COLLABORATION_CONNECTOR);
  });
});
