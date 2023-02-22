import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { readFileSync } from 'fs';
import init from '../../../../test/Implementation/pohoda';
import { container } from '../../../../test/TestAbstract';
import {
    NAME as POHODA_CREATE_NEW_INVOICE_CONNECTOR,
} from '../PohodaCreateInvoiceConnector';

let tester: NodeTester;

describe('Tests for PohodaCreateInvoiceConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, false, ['']);
        init();
    });

    it('process - ok', async () => {
        mockOnce([
            {
                request: {
                    method: HttpMethods.POST, url: /http:\/\/localhost\/xml*/,
                },
                response: {
                    code: 200,
                    body: readFileSync(
                        `${__dirname}/Data/PohodaCreateInvoiceConnector/pohodaCreateInvoiceResponseMock.xml`,
                    ),
                },
            }]);
        await tester.testConnector(POHODA_CREATE_NEW_INVOICE_CONNECTOR);
    });
});
