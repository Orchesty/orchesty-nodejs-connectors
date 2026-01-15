import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import { orchestyOptions } from '@orchesty/nodejs-sdk/dist/lib/Config/Config';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
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
                url: new RegExp(`${orchestyOptions.workerApi}\\/document\\/ApplicationInstall.*`),
            },
            response: {},
            },
        ]);
        await tester.testBatch(SHOPIFY_GET_ORDERS_LIST);
    });
});
