import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/productboard';
import { container } from '../../../../test/TestAbstract';
import { NAME as PRODUCTBOARD_LIST_ALL_FEATURES_BATCH } from '../ProductboardListAllFeaturesBatch';

let tester: NodeTester;

describe('Tests for ProductboardListAllFeaturesBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(PRODUCTBOARD_LIST_ALL_FEATURES_BATCH);
    });
});
