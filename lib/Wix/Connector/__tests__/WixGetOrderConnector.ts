import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as WIX_GET_ORDER_CONNECTOR } from '../WixGetOrderConnector';
import { wixApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for WixGetOrderConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await wixApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(WIX_GET_ORDER_CONNECTOR);
  });
});