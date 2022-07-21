import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../../test/TestAbstract';
import { NAME as AMAZON_GET_ORDERS_CONNECTOR } from '../AmazonGetOrdersConnector';
import { amazonApp } from '../../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for AmazonGetOrdersConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await amazonApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(AMAZON_GET_ORDERS_CONNECTOR);
  });
});
