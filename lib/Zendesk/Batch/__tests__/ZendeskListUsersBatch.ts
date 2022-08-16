import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as ZENDESK_LIST_USERS_BATCH } from '../ZendeskListUsersBatch';
import init from '../../../../test/Implementation/zendesk';

let tester: NodeTester;

describe('Tests for ZendeskListUsersBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await init();
  });

  it('process - ok', async () => {
    await tester.testBatch(ZENDESK_LIST_USERS_BATCH);
  });
});
