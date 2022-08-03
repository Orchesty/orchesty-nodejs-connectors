import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as KATANA_CREATE_PRODUCT_CONNECTOR } from '../KatanaCreateProductConnector';
import { katanaApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for KatanaCreateProductConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await katanaApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(KATANA_CREATE_PRODUCT_CONNECTOR);
  });
});
