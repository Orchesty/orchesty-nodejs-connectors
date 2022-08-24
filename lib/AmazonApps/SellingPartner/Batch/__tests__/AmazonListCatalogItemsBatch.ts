import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { amazonApp } from '../../../../../test/DataProvider';
import { container } from '../../../../../test/TestAbstract';
import { NAME as AMAZON_LIST_CATALOG_ITEMS_BATCH } from '../AmazonListCatalogItemsBatch';

let tester: NodeTester;

describe('Tests for AmazonListCatalogItemsBatch', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await amazonApp();
    });

    it('process - ok', async () => {
        await tester.testBatch(AMAZON_LIST_CATALOG_ITEMS_BATCH);
    });
});
