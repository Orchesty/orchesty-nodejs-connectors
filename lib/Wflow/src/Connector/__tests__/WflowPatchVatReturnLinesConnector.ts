import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as WFLOW_PATCH_VAT_RETURN_LINES } from '../WflowPatchVatReturnLinesConnector';

let tester: NodeTester;

describe('Tests for WflowPatchVatReturnLinesConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(WFLOW_PATCH_VAT_RETURN_LINES);
    });

    it('process - batch', async () => {
        await tester.testConnector(WFLOW_PATCH_VAT_RETURN_LINES, 'batch');
    });
});
