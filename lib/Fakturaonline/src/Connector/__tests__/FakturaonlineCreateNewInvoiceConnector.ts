import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as FAKTURAONLINE_CREATE_NEW_INVOICE_CONNECTOR } from '../FakturaonlineCreateNewInvoiceConnector';

let tester: NodeTester;

describe('Tests for FakturaonlineCreateNewInvoiceConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(FAKTURAONLINE_CREATE_NEW_INVOICE_CONNECTOR);
    });
});
