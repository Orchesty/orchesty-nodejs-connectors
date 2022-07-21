import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../test/TestAbstract';
import { NAME as WEDO_GET_PACKAGE_CONNECTOR } from '../WedoGetPackageConnector';

let tester: NodeTester;

describe('Tests for WedoGetPackageConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
  });

  it('process - ok', async () => {
    await tester.testConnector(WEDO_GET_PACKAGE_CONNECTOR);
  });
});
