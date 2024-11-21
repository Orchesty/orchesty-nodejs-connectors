import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/zendesk';
import { container } from '../../../../test/TestAbstract';
import { ZENDESK_CREATE_TRIGGER } from '../ZendeskCreateTriggerConnector';

let tester: NodeTester;

describe('Tests for ZendeskCreateTriggerConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ZENDESK_CREATE_TRIGGER);
    });
});
