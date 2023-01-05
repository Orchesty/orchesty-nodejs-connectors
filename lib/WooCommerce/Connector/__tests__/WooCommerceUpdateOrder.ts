import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/woocommerce';
import { container } from '../../../../test/TestAbstract';
import { NAME as WOO_COMMERCE_UPDATE_ORDER } from '../WooCommerceUpdateOrder';

let tester: NodeTester;

describe('Tests for WooCommerceUpdateOrder', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        mock();
        await tester.testConnector(WOO_COMMERCE_UPDATE_ORDER);
    });
});
