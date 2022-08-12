import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as WOO_COMMERCE_GET_ORDERS } from '../WooCommerceGetOrders';
import init from '../../../../test/Implementation/woocommerce';

let tester: NodeTester;

describe('Tests for WooCommerceGetProducts', () => {
  beforeAll(async () => {
    tester = new NodeTester(container, __filename);
    await init();
  });

  it('process - ok', async () => {
    await tester.testBatch(WOO_COMMERCE_GET_ORDERS);
  });
});
