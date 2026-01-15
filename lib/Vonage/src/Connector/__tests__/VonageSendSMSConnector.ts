import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
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
