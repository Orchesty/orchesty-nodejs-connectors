import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as SAGE_HR_GET_PROJECTS_BATCH } from '../SageHrGetProjectsBatch';

let tester: NodeTester;

describe('Tests for SageHrGetProjectsBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(SAGE_HR_GET_PROJECTS_BATCH);
    });
});
