import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as ZENDESK_CREATE_TICKET_CONNECTOR } from '../ZendeskCreateTicketConnector';
import { zendeskApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for ZendeskCreateTicketConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await zendeskApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(ZENDESK_CREATE_TICKET_CONNECTOR);
  });
});
