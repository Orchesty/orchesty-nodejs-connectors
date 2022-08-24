import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { fakturaonlineApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as FAKTURAONLINE_CREATE_NEW_INVOICE_CONNECTOR } from '../FakturaonlineCreateNewInvoiceConnector';

let tester: NodeTester;

describe('Tests for FakturaonlineCreateNewInvoiceConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await fakturaonlineApp();
    });

    it('process - ok', async () => {
        await tester.testConnector(FAKTURAONLINE_CREATE_NEW_INVOICE_CONNECTOR);
    });
});
