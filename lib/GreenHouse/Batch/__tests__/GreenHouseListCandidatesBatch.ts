import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/greenHouse';
import { container } from '../../../../test/TestAbstract';
import { NAME as GREEN_HOUSE_LIST_CANDIDATES_BATCH } from '../GreenHouseListCandidatesBatch';

let tester: NodeTester;

describe('Tests for GreenHouseListCandidatesBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(GREEN_HOUSE_LIST_CANDIDATES_BATCH);
    });
});
