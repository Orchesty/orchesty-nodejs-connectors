import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { readFileSync } from 'fs';
import init from '../../../test/dataProvider';
import { NAME as POHODA_GET_RECEIVED_INVOICE_LIST_BATCH } from '../PohodaGetReceivedInvoiceListBatch';

let tester: NodeTester;

describe('Tests for PohodaGetReceivedInvoiceListBatch', () => {
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
                body: readFileSync(`${__dirname}/Data/PohodaGetReceivedInvoiceListBatch/mock.xml`),
            },
        }]);

        await tester.testBatch(POHODA_GET_RECEIVED_INVOICE_LIST_BATCH);
    });
});
