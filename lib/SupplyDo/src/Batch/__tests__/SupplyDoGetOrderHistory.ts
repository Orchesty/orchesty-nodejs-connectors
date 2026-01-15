import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../test/dataProvider';
import { NAME as SUPPLY_DO_GET_ORDER_HISTORY } from '../SupplyDoGetOrderHistory';

let tester: NodeTester;

describe('Tests for SupplyDoGetOrderHistory', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        await tester.testBatch(SUPPLY_DO_GET_ORDER_HISTORY);
    });
});
