import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/base';
import { container } from '../../../../test/TestAbstract';
import { NAME as UPDATE_INVENTORY_PRODUCTS_STOCK } from '../UpdateInventoryProductsStock';

let tester: NodeTester;

describe('Tests for UpdateInventoryProductsStock', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(UPDATE_INVENTORY_PRODUCTS_STOCK);
    });
});
