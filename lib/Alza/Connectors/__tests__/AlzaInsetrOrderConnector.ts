import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/alza';
import { container } from '../../../../test/TestAbstract';
import { NAME as ALZA_INSETR_ORDER_CONNECTOR } from '../AlzaInsetrOrderConnector';

let tester: NodeTester;

describe('Tests for AlzaInsetrOrderConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await init();
  });

  it('process - ok', async () => {
    await tester.testConnector(ALZA_INSETR_ORDER_CONNECTOR);
  });
});
