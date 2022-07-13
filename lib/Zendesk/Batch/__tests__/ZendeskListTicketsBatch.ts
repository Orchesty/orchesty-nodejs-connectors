import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as ZENDESK_LIST_TICKETS_BATCH } from '../ZendeskListTicketsBatch';
import { zendeskApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for ZendeskListTicketsBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await zendeskApp();
  });

  it('process - ok', async () => {
    await tester.testBatch(ZENDESK_LIST_TICKETS_BATCH);
  });
});
