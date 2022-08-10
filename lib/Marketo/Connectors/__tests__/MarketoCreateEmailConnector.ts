import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as MARKETO_CREATE_EMAIL_CONNECTOR } from '../MarketoCreateEmailConnector';
import init from '../../../../test/Implementation/marketo';

let tester: NodeTester;

describe('Tests for MarketoCreateEmailConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await init();
  });

  it('process - ok', async () => {
    await tester.testConnector(MARKETO_CREATE_EMAIL_CONNECTOR);
  });
});
