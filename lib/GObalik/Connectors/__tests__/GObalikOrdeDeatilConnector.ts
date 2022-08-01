import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as GO_BALIK_ORDER_DEATIL_CONNECTOR } from '../GObalikOrderDeatilConnector';
import { gobalikApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for GObalikOrdeDeatilConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await gobalikApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(GO_BALIK_ORDER_DEATIL_CONNECTOR);
  });
});
