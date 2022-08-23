import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as MERGADO_GET_PROJECT_CONNECTOR } from '../MergadoGetProjectConnector';
import init from '../../../../test/Implementation/mergado';

let tester: NodeTester;

describe('Tests for MergadoGetProjectConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await init();
  });

  it('process - ok', async () => {
    await tester.testConnector(MERGADO_GET_PROJECT_CONNECTOR);
  });
});
