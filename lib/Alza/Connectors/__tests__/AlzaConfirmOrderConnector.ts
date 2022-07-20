import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as ALZA_CONFIRM_ORDER_CONNECTOR } from '../AlzaConfirmOrderConnector';
import { alzaApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for AlzaConfirmOrderConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await alzaApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(ALZA_CONFIRM_ORDER_CONNECTOR);
  });
});
