import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../test/dataProvider';
import { NAME as XERO_PUT_INVOiCE_CONNECTOR } from '../XeroPutInvoiceConnector';

let tester: NodeTester;

describe('Tests for XeroPutInvoceConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        mock();
        await tester.testConnector(XERO_PUT_INVOiCE_CONNECTOR);
    });
});
