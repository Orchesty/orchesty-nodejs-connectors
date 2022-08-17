import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPTET_GET_ESHOP_INFO } from '../ShoptetGetEshopInfo';
import init from '../../../../test/Implementation/shoptet';

let tester: NodeTester;

describe('Tests for ShoptetGetEshopInfo', () => {
  beforeAll(async () => {
    tester = new NodeTester(container, __filename, true);
    await init();
  });

  it('process - ok', async () => {
    await tester.testConnector(SHOPTET_GET_ESHOP_INFO);
  });
});
