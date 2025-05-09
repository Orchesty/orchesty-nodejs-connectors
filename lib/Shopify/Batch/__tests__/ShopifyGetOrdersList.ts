import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { devIp } from '../../../../.jest/testEnvs';
import init from '../../../../test/Implementation/shopify';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPIFY_GET_ORDERS_LIST } from '../ShopifyGetOrderList';

let tester: NodeTester;

describe('Tests for ShopifyGetProductsList', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        mockOnce([
            { request: {
                method: HttpMethods.POST,
                url: new RegExp(`http:\\/\\/${devIp}\\/document\\/ApplicationInstall.*`),
            },
            response: {},
            },
        ]);
        await tester.testBatch(SHOPIFY_GET_ORDERS_LIST);
    });
});
