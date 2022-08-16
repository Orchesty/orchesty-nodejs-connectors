import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as ZENDESK_CREATE_TICKET_CONNECTOR } from '../ZendeskCreateTicketConnector';
import init from '../../../../test/Implementation/zendesk';

let tester: NodeTester;

describe('Tests for ZendeskCreateTicketConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await init();
  });

  it('process - ok', async () => {
    await tester.testConnector(ZENDESK_CREATE_TICKET_CONNECTOR);
  });
});
