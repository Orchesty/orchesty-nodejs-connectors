import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../test/dataProvider';
import { NAME as SHOPTET_UPDATE_STOCK_MOVEMENTS } from '../ShoptetUpdateStockMovements';

let tester: NodeTester;

describe('Tests for ShoptetUpdateStockMovements', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        mock();
        await tester.testConnector(SHOPTET_UPDATE_STOCK_MOVEMENTS);
    });

    it('process - do not continue', async () => {
        mock();
        await tester.testConnector(SHOPTET_UPDATE_STOCK_MOVEMENTS, 'empty');
    });
});
