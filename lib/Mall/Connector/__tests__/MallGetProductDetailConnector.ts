import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as MALL_GET_PRODUCT_DETAIL_CONNECTOR } from '../MallGetProductDetailConnector';
import { mallApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for MallGetProductDetailConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await mallApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(MALL_GET_PRODUCT_DETAIL_CONNECTOR);
  });
});
