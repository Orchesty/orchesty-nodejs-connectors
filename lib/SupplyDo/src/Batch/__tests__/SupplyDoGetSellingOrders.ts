import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock, mockDate } from '../../../test/dataProvider';
import { NAME as SUPPLY_DO_GET_SELLING_ORDERS } from '../SupplyDoGetSellingOrders';

let tester: NodeTester;

describe('Tests for SupplyDoGetSellingOrders', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        mock();
        mockDate();
        await tester.testBatch(SUPPLY_DO_GET_SELLING_ORDERS);
    });

    it('process - with Id', async () => {
        mock();
        mockDate();
        await tester.testBatch(SUPPLY_DO_GET_SELLING_ORDERS, 'id');
    });
});
