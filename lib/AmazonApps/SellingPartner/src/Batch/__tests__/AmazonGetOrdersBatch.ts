import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as AMAZON_GET_ORDERS_BATCH } from '../AmazonGetOrdersBatch';

let tester: NodeTester;

describe('Tests for AmazonGetOrdersBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(AMAZON_GET_ORDERS_BATCH);
    });
});
