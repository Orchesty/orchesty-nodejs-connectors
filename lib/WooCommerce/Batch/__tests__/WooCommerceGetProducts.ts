import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../test/TestAbstract';
import { NAME as WOO_COMMERCE_GET_PRODUCTS } from '../WooCommerceGetProducts';

let tester: NodeTester;

describe('Tests for WooCommerceGetProducts', () => {
  beforeEach(() => {
    tester = new NodeTester(container, __filename);
  });

  it('process - ok', async () => {
    await tester.testBatch(WOO_COMMERCE_GET_PRODUCTS);
  });
});
