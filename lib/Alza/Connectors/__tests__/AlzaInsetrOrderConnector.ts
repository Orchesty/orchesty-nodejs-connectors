import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as ALZA_INSETR_ORDER_CONNECTOR } from '../AlzaInsetrOrderConnector';
import { alzaApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for AlzaInsetrOrderConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await alzaApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(ALZA_INSETR_ORDER_CONNECTOR);
  });
});
