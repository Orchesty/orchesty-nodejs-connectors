import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as MAILSTEP_POST_EXPEDITION_CONNECTOR } from '../MailstepPostExpeditionConnector';

let tester: NodeTester;

describe('Tests for MailstepPostExpeditionConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MAILSTEP_POST_EXPEDITION_CONNECTOR);
    });
});
