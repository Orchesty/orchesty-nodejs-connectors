import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as ZENDESK_CREATE_TICKET_CONNECTOR } from '../ZendeskCreateTicketConnector';

let tester: NodeTester;

describe('Tests for ZendeskCreateTicketConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ZENDESK_CREATE_TICKET_CONNECTOR);
    });
});
