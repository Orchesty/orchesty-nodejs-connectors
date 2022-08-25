import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { paypalApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as PAYPAL_CREATE_ORDER_CONNECTOR } from '../PaypalCreateOrderConnector';

let tester: NodeTester;

describe('Tests for PaypalCreateOrderConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await paypalApp();
    });

    it('process - ok', async () => {
        await tester.testConnector(PAYPAL_CREATE_ORDER_CONNECTOR);
    });
});
