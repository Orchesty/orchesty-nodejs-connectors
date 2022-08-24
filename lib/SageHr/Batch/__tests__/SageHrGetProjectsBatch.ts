import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/sagehr';
import { container } from '../../../../test/TestAbstract';
import { NAME as SAGE_HR_GET_PROJECTS_BATCH } from '../SageHrGetProjectsBatch';

let tester: NodeTester;

describe('Tests for SageHrGetProjectsBatch', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testBatch(SAGE_HR_GET_PROJECTS_BATCH);
    });
});
