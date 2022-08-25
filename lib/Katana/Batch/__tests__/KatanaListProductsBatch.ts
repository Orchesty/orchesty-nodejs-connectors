import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { katanaApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as KATANA_LIST_PRODUCTS_BATCH } from '../KatanaListProductsBatch';

let tester: NodeTester;

describe('Tests for KatanaListProductsBatch', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await katanaApp();
    });

    it('process - ok', async () => {
        await tester.testBatch(KATANA_LIST_PRODUCTS_BATCH);
    });
});
