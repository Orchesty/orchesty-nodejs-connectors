import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as WFLOW_PATCH_ACCOUNTING_RULES } from '../WflowPatchAccountingRulesConnector';

let tester: NodeTester;

describe('Tests for WflowPatchAccountingRulesConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(WFLOW_PATCH_ACCOUNTING_RULES);
    });

    it('process - batch', async () => {
        await tester.testConnector(WFLOW_PATCH_ACCOUNTING_RULES, 'batch');
    });
});
