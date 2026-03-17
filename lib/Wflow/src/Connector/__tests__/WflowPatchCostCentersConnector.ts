import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as WFLOW_PATCH_COST_CENTERS } from '../WflowPatchCostCentersConnector';

let tester: NodeTester;

describe('Tests for WflowPatchCostCentersConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(WFLOW_PATCH_COST_CENTERS);
    });

    it('process - batch', async () => {
        await tester.testConnector(WFLOW_PATCH_COST_CENTERS, 'batch');
    });
});
