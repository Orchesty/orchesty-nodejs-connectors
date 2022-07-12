import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { NAME as BIGCOMMERCE_CREATE_PRODUCT_CONNECTOR } from '../BigcommerceCreateProductConnector';
import { container } from '../../../../test/TestAbstract';
import { bigcommerceApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for BigcommerceCreateProductConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await bigcommerceApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(BIGCOMMERCE_CREATE_PRODUCT_CONNECTOR);
  });
});
