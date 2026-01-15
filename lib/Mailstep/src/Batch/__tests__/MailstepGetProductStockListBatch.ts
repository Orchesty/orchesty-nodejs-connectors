import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as MAILSTEP_GET_PRODUCT_STOCK_LIST_BATCH } from '../MailstepGetProductStockListBatch';

let tester: NodeTester;

describe('Tests for MailstepGetProductStockListBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(MAILSTEP_GET_PRODUCT_STOCK_LIST_BATCH);
    });
});
