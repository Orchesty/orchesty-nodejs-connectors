import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/vyfakturuj';
import { container } from '../../../../test/TestAbstract';
import { NAME as VYFAKTURUJ_CREATE_INVOICE_CONNECTOR } from '../VyfakturujCreateInvoiceConnector';

let tester: NodeTester;

describe('Tests for VyfakturujCreateInvoiceConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(VYFAKTURUJ_CREATE_INVOICE_CONNECTOR);
    });
});
