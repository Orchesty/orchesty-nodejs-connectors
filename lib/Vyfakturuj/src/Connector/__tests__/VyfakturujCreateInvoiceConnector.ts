import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as VYFAKTURUJ_CREATE_INVOICE_CONNECTOR } from '../VyfakturujCreateInvoiceConnector';

let tester: NodeTester;

describe('Tests for VyfakturujCreateInvoiceConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(VYFAKTURUJ_CREATE_INVOICE_CONNECTOR);
    });
});
