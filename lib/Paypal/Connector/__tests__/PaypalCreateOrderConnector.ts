import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/paypal';
import { container } from '../../../../test/TestAbstract';
import { NAME as PAYPAL_CREATE_ORDER_CONNECTOR } from '../PaypalCreateOrderConnector';

let tester: NodeTester;

describe('Tests for PaypalCreateOrderConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(PAYPAL_CREATE_ORDER_CONNECTOR);
    });
});
