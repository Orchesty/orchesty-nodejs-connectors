import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/shoptet';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPTET_GET_ALL_PRODUCTS } from '../ShoptetGetAllProducts';

let tester: NodeTester;

describe('Tests for ShoptetGetAllProducts', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        mock(2);
        await tester.testConnector(SHOPTET_GET_ALL_PRODUCTS);
    });
});
