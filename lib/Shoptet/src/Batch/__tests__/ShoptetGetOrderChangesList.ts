import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import { orchestyOptions } from '@orchesty/nodejs-sdk/dist/lib/Config/Config';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock, mockDate, restoreDate } from '../../../test/dataProvider';
import { NAME as SHOPTET_GET_ORDER_CHANGES_LIST } from '../ShoptetGetOrderChangesList';

let tester: NodeTester;

describe('Tests for ShoptetGetOrderChangesList', () => {
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
        mock(1);
        await tester.testBatch(SHOPTET_GET_ORDER_CHANGES_LIST);
        restoreDate();
    });

    it('process - with after', async () => {
        mock(1, { lastRunListOrderChanges: '2017-03-23T17:03:12Z' });
        await tester.testBatch(SHOPTET_GET_ORDER_CHANGES_LIST, 'with-after');
    });
});
