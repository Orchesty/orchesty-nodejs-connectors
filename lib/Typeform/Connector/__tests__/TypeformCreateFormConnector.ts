import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as TYPEFORM_CREATE_FORM_CONNECTOR } from '../TypeformCreateFormConnector';
import init from '../../../../test/Implementation/typeform';

let tester: NodeTester;

describe('Tests for TypeformCreateFormConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await init();
  });

  it('process - ok', async () => {
    await tester.testConnector(TYPEFORM_CREATE_FORM_CONNECTOR);
  });
});
