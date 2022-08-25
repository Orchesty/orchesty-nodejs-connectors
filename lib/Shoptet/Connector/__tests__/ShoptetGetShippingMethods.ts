import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/shoptet';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPTET_GET_SHIPPING_METHODS } from '../ShoptetGetShippingMethods';

let tester: NodeTester;

describe('Tests for ShoptetGetShippingMethods', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(SHOPTET_GET_SHIPPING_METHODS);
    });
});
