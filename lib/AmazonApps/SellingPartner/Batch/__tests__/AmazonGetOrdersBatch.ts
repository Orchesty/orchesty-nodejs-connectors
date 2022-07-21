import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../../test/TestAbstract';
import { NAME as AMAZON_GET_ORDERS_BATCH } from '../AmazonGetOrdersBatch';
import { amazonApp } from '../../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for AmazonGetOrdersBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await amazonApp();
  });

  it('process - ok', async () => {
    await tester.testBatch(AMAZON_GET_ORDERS_BATCH);
  });
});
