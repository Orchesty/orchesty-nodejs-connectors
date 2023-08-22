import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/woocommerce';
import { container } from '../../../../test/TestAbstract';
import { NAME as WOO_COMMERCE_GET_PAYMENT_GATEWAYS } from '../WooCommerceGetPaymentGateways';

let tester: NodeTester;

describe('Tests for WooCommerceGetPaymentGateways', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        mock();
        await tester.testConnector(WOO_COMMERCE_GET_PAYMENT_GATEWAYS);
    });
});
