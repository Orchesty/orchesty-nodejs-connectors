import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as PRODUCTBOARD_LIST_ALL_PRODUCTS_BATCH } from '../ProductboardListAllProductsBatch';
import { productboardApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for ProductboardListAllProductsBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await productboardApp();
  });

  it('process - ok', async () => {
    await tester.testBatch(PRODUCTBOARD_LIST_ALL_PRODUCTS_BATCH);
  });
});