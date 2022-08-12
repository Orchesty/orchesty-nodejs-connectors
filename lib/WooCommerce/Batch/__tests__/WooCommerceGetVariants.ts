import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as WOO_COMMERCE_GET_VARIANTS } from '../WooCommerceGetVariants';
import init from '../../../../test/Implementation/woocommerce';

let tester: NodeTester;

describe('Tests for WooCommerceGetVariants', () => {
  beforeAll(async () => {
    tester = new NodeTester(container, __filename);
    await init();
  });

  it('process - ok', async () => {
    await tester.testBatch(WOO_COMMERCE_GET_VARIANTS);
  });
});
