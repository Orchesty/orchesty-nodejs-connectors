import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { mockDate, restoreDate } from '../../../../.jest/testLifecycle';
import { init, mock } from '../../../../test/Implementation/shoptet';
import { container } from '../../../../test/TestAbstract';
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
                url: /http:\/\/127\.0\.0\.40\/document\/ApplicationInstall.*/ },
            response: {},
            },
        ]);
    });

    it('process - ok', async () => {
        mockDate();
        mock(2);
        await tester.testBatch(SHOPTET_GET_ORDER_CHANGES_LIST);
        restoreDate();
    });

    it('process - with after', async () => {
        await new Promise((r) => {
            setTimeout(r, 2000);
        });
        mock(2, { lastRunListOrderChanges: '2017-03-23T17:03:12Z' });
        await tester.testBatch(SHOPTET_GET_ORDER_CHANGES_LIST, 'with-after');
    });
});
