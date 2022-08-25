import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/zendesk';
import { container } from '../../../../test/TestAbstract';
import { NAME as ZENDESK_LIST_TICKETS_BATCH } from '../ZendeskListTicketsBatch';

let tester: NodeTester;

describe('Tests for ZendeskListTicketsBatch', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testBatch(ZENDESK_LIST_TICKETS_BATCH);
    });
});
