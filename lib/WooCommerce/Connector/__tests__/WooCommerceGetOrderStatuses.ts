import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/woocommerce';
import { container } from '../../../../test/TestAbstract';
import { NAME as WOO_COMMERCE_GET_ORDER_STATUSES } from '../WooCommerceGetOrderStatuses';

let tester: NodeTester;

describe('Tests for WooCommerceGetOrderStatuses', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(WOO_COMMERCE_GET_ORDER_STATUSES);
    });
});
