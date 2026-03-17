import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as WFLOW_PATCH_VAT_CONTROL_STATEMENT_LINES } from '../WflowPatchVatControlStatementLinesConnector';

let tester: NodeTester;

describe('Tests for WflowPatchVatControlStatementLinesConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(WFLOW_PATCH_VAT_CONTROL_STATEMENT_LINES);
    });

    it('process - batch', async () => {
        await tester.testConnector(WFLOW_PATCH_VAT_CONTROL_STATEMENT_LINES, 'batch');
    });
});
