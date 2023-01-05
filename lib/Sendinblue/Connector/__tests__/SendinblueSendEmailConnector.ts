import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/sendinblue';
import { container } from '../../../../test/TestAbstract';
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
