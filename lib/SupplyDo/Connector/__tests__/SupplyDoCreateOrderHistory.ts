import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/supplyDo';
import { container } from '../../../../test/TestAbstract';
import { NAME as SUPPLY_DO_CREATE_ORDER_HISTORY } from '../SupplyDoCreateOrderHistory';

let tester: NodeTester;

describe('Tests for SupplyDoCreateOrderHistory', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        await tester.testConnector(SUPPLY_DO_CREATE_ORDER_HISTORY);
    });
});
