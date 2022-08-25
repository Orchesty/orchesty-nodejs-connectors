import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { paypalApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as PAYPAL_CREATE_PAYOUT_CONNECTOR } from '../PaypalCreatePayoutConnector';

let tester: NodeTester;

describe('Tests for PaypalCreatePayoutConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await paypalApp();
    });

    it('process - ok', async () => {
        await tester.testConnector(PAYPAL_CREATE_PAYOUT_CONNECTOR);
    });
});
