import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/bulkGate';
import { container } from '../../../../test/TestAbstract';
import { NAME as BULK_GATE_GET_PROMOTIONAL_SMS_CONNECTOR } from '../BulkGateGetPromotionalSMSConnector';

let tester: NodeTester;

describe('Tests for BulkGateGetPromotionalSMSConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(BULK_GATE_GET_PROMOTIONAL_SMS_CONNECTOR);
    });
});
