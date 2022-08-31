import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../../test/Implementation/amazon';
import { container } from '../../../../../test/TestAbstract';
import { NAME as AMAZON_GET_ORDERS_BATCH } from '../AmazonGetOrdersBatch';

let tester: NodeTester;

describe('Tests for AmazonGetOrdersBatch', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testBatch(AMAZON_GET_ORDERS_BATCH);
    });
});
