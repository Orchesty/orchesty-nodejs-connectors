import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/iDoklad';
import { container } from '../../../../test/TestAbstract';
import { NAME as I_DOKLAD_NEW_INVOICE_ISSUED_CONNECTOR } from '../IDokladNewInvoiceIssuedConnector';

let tester: NodeTester;

describe('Tests for IDokladNewInvoiceIssuedConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, false, ['']);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(I_DOKLAD_NEW_INVOICE_ISSUED_CONNECTOR, '');
    });
});
