import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/recruitee';
import { container } from '../../../../test/TestAbstract';
import { NAME as RECRUITEE_LIST_CANDIDATES_BATCH } from '../RecruiteeListCandidatesBatch';

let tester: NodeTester;

describe('Tests for RecruiteeListCandidatesBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(RECRUITEE_LIST_CANDIDATES_BATCH);
    });
});
