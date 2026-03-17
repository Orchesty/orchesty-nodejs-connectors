import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as WFLOW_PATCH_CHART_OF_ACCOUNTS } from '../WflowPatchChartOfAccountsConnector';

let tester: NodeTester;

describe('Tests for WflowPatchChartOfAccountsConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(WFLOW_PATCH_CHART_OF_ACCOUNTS);
    });

    it('process - batch', async () => {
        await tester.testConnector(WFLOW_PATCH_CHART_OF_ACCOUNTS, 'batch');
    });
});
