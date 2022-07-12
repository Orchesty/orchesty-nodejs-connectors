import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { NAME as BIG_COMMERCE_CREATE_ORDER } from '../BigcommerceCreateOrderConnector';
import { bigcommerceApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';

let tester: NodeTester;

describe('Tests for BigcommerceCreateOrderConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await bigcommerceApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(BIG_COMMERCE_CREATE_ORDER);
  });
});
