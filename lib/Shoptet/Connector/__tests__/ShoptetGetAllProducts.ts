import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { NAME as SHOPTET_GET_ALL_PRODUCTS } from '../ShoptetGetAllProducts';
import { container } from '../../../../test/TestAbstract';
import init from '../../../../test/Implementation/shoptet';

let tester: NodeTester;

describe('Tests for ShoptetGetAllProducts', () => {
  beforeAll(async () => {
    tester = new NodeTester(container, __filename);
    await init();
  });

  it('process - ok', async () => {
    await tester.testConnector(SHOPTET_GET_ALL_PRODUCTS);
  });
});
