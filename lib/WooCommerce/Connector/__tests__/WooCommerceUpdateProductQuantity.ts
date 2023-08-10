import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/woocommerce';
import { container } from '../../../../test/TestAbstract';
import { NAME as WOO_COMMERCE_UPDATE_PRODUCT_QUANTITY } from '../WooCommerceUpdateProductQuantity';

let tester: NodeTester;

describe('Tests for WooCommerceUpdateProductQuantity', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        mock();
        await tester.testConnector(WOO_COMMERCE_UPDATE_PRODUCT_QUANTITY);
    });
});
