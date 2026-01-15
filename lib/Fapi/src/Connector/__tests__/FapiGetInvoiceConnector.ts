import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as FAPI_GET_INVOICE_CONNECTOR } from '../FapiGetInvoiceConnector';

let tester: NodeTester;

describe('Tests for FapiGetInvoiceConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(FAPI_GET_INVOICE_CONNECTOR);
    });
});
