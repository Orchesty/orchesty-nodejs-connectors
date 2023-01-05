import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/recruitee';
import { container } from '../../../../test/TestAbstract';
import { NAME as RECRUITEE_GET_OFFERS_BATCH } from '../RecruiteeGetOffersBatch';

let tester: NodeTester;

describe('Tests for RecruiteeGetOffersBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(RECRUITEE_GET_OFFERS_BATCH);
    });
});
