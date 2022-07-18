import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as MALL_POST_PRODUCT_CONNECTOR } from '../MallPostProductConnector';
import { mallApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for MallPostProductConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await mallApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(MALL_POST_PRODUCT_CONNECTOR);
  });
});
