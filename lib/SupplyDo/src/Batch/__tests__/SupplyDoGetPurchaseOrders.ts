import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock, mockDate } from '../../../test/dataProvider';
import { NAME as SUPPLY_DO_GET_PURCHASE_ORDERS } from '../SupplyDoGetPurchaseOrders';

let tester: NodeTester;

describe('Tests for SupplyDoGetPurchaseOrders', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        mockDate();
        await tester.testBatch(SUPPLY_DO_GET_PURCHASE_ORDERS);
    });
});
