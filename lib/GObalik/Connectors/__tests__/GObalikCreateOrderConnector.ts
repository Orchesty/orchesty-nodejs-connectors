import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as G_OBALIK_CREATE_ORDER_CONNECTOR } from '../GObalikCreateOrderConnector';
import { gobalikApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for GObalikCreateOrderConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await gobalikApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(G_OBALIK_CREATE_ORDER_CONNECTOR);
  });
});
