import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/fapi';
import { container } from '../../../../test/TestAbstract';
import { NAME as FAPI_POST_INVOICE_LABEL_CONNECTOR } from '../FapiPostInvoiceLabelConnector';

let tester: NodeTester;

describe('Tests for FapiPostInvoiceLabelConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(FAPI_POST_INVOICE_LABEL_CONNECTOR);
    });
});
