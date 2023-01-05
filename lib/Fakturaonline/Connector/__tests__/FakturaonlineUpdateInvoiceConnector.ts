import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/fakturaOnline';
import { container } from '../../../../test/TestAbstract';
import { NAME as FAKTURAONLINE_UPDATE_INVOICE_CONNECTOR } from '../FakturaonlineUpdateInvoiceConnector';

let tester: NodeTester;

describe('Tests for FakturaonlineUpdateInvoiceConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(FAKTURAONLINE_UPDATE_INVOICE_CONNECTOR);
    });
});
