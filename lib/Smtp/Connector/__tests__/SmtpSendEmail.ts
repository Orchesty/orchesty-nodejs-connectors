import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/smtp';
import { container } from '../../../../test/TestAbstract';
import { NAME as SMTP_SEND_EMAIL } from '../SmtpSendEmail';

let tester: NodeTester;

describe('Tests for SmtpSendEmail', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(SMTP_SEND_EMAIL);
    });
});
