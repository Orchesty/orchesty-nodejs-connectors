import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/base';
import { container } from '../../../../test/TestAbstract';
import { NAME as INVENTORY_PRODUCTS_DATA } from '../InventoryProductsData';

let tester: NodeTester;

describe('Tests for InventoryProductsData', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(INVENTORY_PRODUCTS_DATA);
    });
});
