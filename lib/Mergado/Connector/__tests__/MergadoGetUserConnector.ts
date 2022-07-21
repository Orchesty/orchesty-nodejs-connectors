import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as MERGADO_GET_USER_CONNECTOR } from '../MergadoGetUserConnector';
import { mergadoApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for MergadoGetUserConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await mergadoApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(MERGADO_GET_USER_CONNECTOR);
  });
});
