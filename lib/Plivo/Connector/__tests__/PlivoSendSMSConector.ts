import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as PLIVO_SEND_SMS_CONECTOR } from '../PlivoSendSMSConector';
import init from '../../../../test/Implementation/plivo';

let tester: NodeTester;

describe('Tests for PlivoSendSMSConector', () => {
  beforeAll(async () => {
    tester = new NodeTester(container, __filename, true);
    await init();
  });

  it('process - ok', async () => {
    await tester.testConnector(PLIVO_SEND_SMS_CONECTOR);
  });
});
