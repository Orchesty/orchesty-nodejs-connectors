import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as WIX_UPDATE_PRODUCT_CONNECTOR } from '../WixUpdateProductConnector';
import { wixApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for WixUpdateProductConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await wixApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(WIX_UPDATE_PRODUCT_CONNECTOR);
  });
});
