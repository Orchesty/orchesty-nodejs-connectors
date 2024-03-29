import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../../test/Implementation/amazon';
import { container } from '../../../../../test/TestAbstract';
import { NAME as AMAZON_LIST_CATALOG_ITEMS_BATCH } from '../AmazonListCatalogItemsBatch';

let tester: NodeTester;

describe('Tests for AmazonListCatalogItemsBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(AMAZON_LIST_CATALOG_ITEMS_BATCH);
    });
});
