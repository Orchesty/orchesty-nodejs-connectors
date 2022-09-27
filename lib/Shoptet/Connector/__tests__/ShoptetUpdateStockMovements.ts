import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/shoptet';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPTET_UPDATE_STOCK_MOVEMENTS } from '../ShoptetUpdateStockMovements';

let tester: NodeTester;

describe('Tests for ShoptetUpdateStockMovements', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(SHOPTET_UPDATE_STOCK_MOVEMENTS);
    });
});
