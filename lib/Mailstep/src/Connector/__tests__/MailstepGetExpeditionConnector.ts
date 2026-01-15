import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
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
