import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as SENDINBLUE_SEND_EMAIL_CONNECTOR } from '../SendinblueSendEmailConnector';

let tester: NodeTester;

describe('Tests for SendinblueSendEmailConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(SENDINBLUE_SEND_EMAIL_CONNECTOR);
    });
});
