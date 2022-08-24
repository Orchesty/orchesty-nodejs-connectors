import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/plivo';
import { container } from '../../../../test/TestAbstract';
import { NAME as PLIVO_SEND_SMS_CONECTOR } from '../PlivoSendSMSConector';

let tester: NodeTester;

describe('Tests for PlivoSendSMSConector', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename, true);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(PLIVO_SEND_SMS_CONECTOR);
    });
});
