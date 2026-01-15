import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
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
