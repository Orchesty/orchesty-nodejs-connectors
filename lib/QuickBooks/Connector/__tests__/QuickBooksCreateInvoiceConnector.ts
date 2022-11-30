import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/quickBooks';
import { container } from '../../../../test/TestAbstract';
import { NAME as QUICK_BOOKS_CREATE_INVOICE_CONNECTOR } from '../QuickBooksCreateInvoiceConnector';

let tester: NodeTester;

describe('Tests for QuickBooksCreateInvoiceConnector', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(QUICK_BOOKS_CREATE_INVOICE_CONNECTOR);
    });
});
