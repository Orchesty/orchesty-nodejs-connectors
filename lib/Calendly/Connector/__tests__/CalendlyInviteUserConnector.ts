import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/calendly';
import { container } from '../../../../test/TestAbstract';
import { NAME as CALENDLY_INVITE_USER_CONNECTOR } from '../CalendlyInviteUserConnector';

let tester: NodeTester;

describe('Tests for CalendlyInviteUserConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(CALENDLY_INVITE_USER_CONNECTOR);
    });
});
