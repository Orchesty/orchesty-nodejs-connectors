import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/vonage';
import { container } from '../../../../test/TestAbstract';
import { NAME as VONAGE_SEND_SMS_CONNECTOR } from '../VonageSendSMSConnector';

let tester: NodeTester;

describe('Tests for VonageSendSMSConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(VONAGE_SEND_SMS_CONNECTOR);
    });
});
