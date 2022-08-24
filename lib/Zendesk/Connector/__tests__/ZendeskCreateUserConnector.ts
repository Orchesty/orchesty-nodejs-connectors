import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/zendesk';
import { container } from '../../../../test/TestAbstract';
import { NAME as ZENDESK_CREATE_USER_CONNECTOR } from '../ZendeskCreateUserConnector';

let tester: NodeTester;

describe('Tests for ZendeskCreateUserConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ZENDESK_CREATE_USER_CONNECTOR);
    });
});
