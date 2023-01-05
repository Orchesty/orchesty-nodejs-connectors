import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/fakturaOnline';
import { container } from '../../../../test/TestAbstract';
import { NAME as FAKTURAONLINE_GET_INVOICE_CONNECTOR } from '../FakturaonlineGetInvoiceConnector';

let tester: NodeTester;

describe('Tests for FakturaonlineGetInvoiceConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(FAKTURAONLINE_GET_INVOICE_CONNECTOR);
    });
});
