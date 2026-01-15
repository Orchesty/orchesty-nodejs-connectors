import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as MAILSTEP_SEND_EXPEDITION_CONNECTOR } from '../MailstepSendExpeditionConnector';

let tester: NodeTester;

describe('Tests for MailstepSendExpeditionConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MAILSTEP_SEND_EXPEDITION_CONNECTOR);
    });
});
