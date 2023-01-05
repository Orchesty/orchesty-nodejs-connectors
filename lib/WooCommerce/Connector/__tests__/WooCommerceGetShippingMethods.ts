import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/woocommerce';
import { container } from '../../../../test/TestAbstract';
import { NAME as WOO_COMMERCE_GET_SHIPPING_METHODS } from '../WooCommerceGetShippingMethods';

let tester: NodeTester;

describe('Tests for WooCommerceGetShippingMethods', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        mock();
        await tester.testConnector(WOO_COMMERCE_GET_SHIPPING_METHODS);
    });
});
