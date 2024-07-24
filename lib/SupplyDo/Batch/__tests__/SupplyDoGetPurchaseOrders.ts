import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { mockDate } from '../../../../.jest/testLifecycle';
import { init, mock } from '../../../../test/Implementation/supplyDo';
import { container } from '../../../../test/TestAbstract';
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
