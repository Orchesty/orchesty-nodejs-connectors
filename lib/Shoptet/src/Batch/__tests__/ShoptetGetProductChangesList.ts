import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import { orchestyOptions } from '@orchesty/nodejs-sdk/dist/lib/Config/Config';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock, mockDate, restoreDate } from '../../../test/dataProvider';
import { NAME as SHOPTET_GET_PRODUCT_CHANGES_LIST } from '../ShoptetGetProductChangesList';

let tester: NodeTester;

describe('Tests for ShoptetGetProductChangesList', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    beforeEach(() => {
        mockOnce([
            { request: {
                method: HttpMethods.POST,
                url: new RegExp(`${orchestyOptions.workerApi}\\/document\\/ApplicationInstall.*`),
            },
            response: {},
            },
        ]);
    });

    it('process - ok', async () => {
        mockDate();
        mock(2);
        await tester.testBatch(SHOPTET_GET_PRODUCT_CHANGES_LIST);
        restoreDate();
    });

    it('process - with after', async () => {
        await new Promise((r) => {
            setTimeout(r, 2000);
        });
        mock(2, { lastRunListProductChanges: '2000-12-02T11:12:58Z' });
        await tester.testBatch(SHOPTET_GET_PRODUCT_CHANGES_LIST, 'with-after');
    });
});
