import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as ALZA_CANCEL_ORDER_CONNECTOR } from '../AlzaCancelOrderConnector';
import { alzaApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for AlzaCancelOrderConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await alzaApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(ALZA_CANCEL_ORDER_CONNECTOR);
  });
});
