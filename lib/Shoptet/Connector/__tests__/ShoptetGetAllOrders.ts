import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { NAME as SHOPTET_GET_ALL_ORDERS } from '../ShoptetGetAllOrders';
import { container } from '../../../../test/TestAbstract';
import init from '../../../../test/Implementation/shoptet';

let tester: NodeTester;

describe('Tests for ShoptetGetAllOrders', () => {
  beforeAll(async () => {
    tester = new NodeTester(container, __filename);
    await init();
  });

  it('process - ok', async () => {
    await tester.testConnector(SHOPTET_GET_ALL_ORDERS);
  });
});
