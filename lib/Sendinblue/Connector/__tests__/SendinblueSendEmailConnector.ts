import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../test/TestAbstract';
import { NAME as SENDINBLUE_SEND_EMAIL_CONNECTOR } from '../SendinblueSendEmailConnector';

let tester: NodeTester;

describe('Tests for SendinblueSendEmailConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
  });

  it('process - ok', async () => {
    await tester.testConnector(SENDINBLUE_SEND_EMAIL_CONNECTOR);
  });
});
