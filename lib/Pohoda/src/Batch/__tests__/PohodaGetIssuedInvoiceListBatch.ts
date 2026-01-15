import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { readFileSync } from 'fs';
import init from '../../../test/dataProvider';
import { NAME as POHODA_GET_ISSUED_INVOICE_LIST_BATCH } from '../PohodaGetIssuedInvoiceListBatch';

let tester: NodeTester;

describe('Tests for PohodaGetIssuedInvoiceListBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, false, ['']);
        init();
    });

    it('process - ok', async () => {
        mockOnce([{
            request: {
                method: HttpMethods.POST, url: /http:\/\/localhost\/xml*/,
            },
            response: {
                code: 200,
                body: readFileSync(`${__dirname}/Data/PohodaGetIssuedInvoiceListBatch/mock.xml`),
            },
        }]);

        await tester.testBatch(POHODA_GET_ISSUED_INVOICE_LIST_BATCH);
    });
});
