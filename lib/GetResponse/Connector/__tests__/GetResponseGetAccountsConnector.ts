import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as GET_RESPONSE_GET_ACCOUNTS_CONNECTOR } from '../GetResponseGetAccountsConnector';
import init from '../../../../test/Implementation/GetResponse';

let tester: NodeTester;

describe('Tests for GetResponseGetAccountsConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await init();
  });

  it('process - ok', async () => {
    await tester.testConnector(GET_RESPONSE_GET_ACCOUNTS_CONNECTOR);
  });
});
