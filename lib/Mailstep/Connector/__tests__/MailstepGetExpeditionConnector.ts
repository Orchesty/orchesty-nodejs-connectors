import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/mailstep';
import { container } from '../../../../test/TestAbstract';
import { NAME as MAILSTEP_GET_EXPEDITION_CONNECTOR } from '../MailstepGetExpeditionConnector';

let tester: NodeTester;

describe('Tests for MailstepGetExpeditionConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MAILSTEP_GET_EXPEDITION_CONNECTOR);
    });
});
