import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/workable';
import { container } from '../../../../test/TestAbstract';
import { NAME as WORKABLE_JOBS_BATCH } from '../WorkableJobsBatch';

let tester: NodeTester;

describe('Tests for WorkableJobsBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(WORKABLE_JOBS_BATCH);
    });
});
