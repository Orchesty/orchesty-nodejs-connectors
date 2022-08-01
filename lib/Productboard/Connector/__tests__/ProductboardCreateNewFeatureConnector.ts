import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as PRODUCTBOARD_CREATE_NEW_FEATURE_CONNECTOR } from '../ProductboardCreateNewFeatureConnector';
import { productboardApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for ProductboardCreateNewFeatureConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await productboardApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(PRODUCTBOARD_CREATE_NEW_FEATURE_CONNECTOR);
  });
});
