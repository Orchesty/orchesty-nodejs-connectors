import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/woocommerce';
import { container } from '../../../../test/TestAbstract';
import { NAME as WOO_COMMERCE_GET_SHIPPING_METHODS } from '../WooCommerceGetShippingMethods';

let tester: NodeTester;

describe('Tests for WooCommerceGetShippingMethods', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(WOO_COMMERCE_GET_SHIPPING_METHODS);
    });
});
