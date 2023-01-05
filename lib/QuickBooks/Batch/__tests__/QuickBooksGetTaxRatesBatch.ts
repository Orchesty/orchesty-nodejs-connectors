import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/quickBooks';
import { container } from '../../../../test/TestAbstract';
import { NAME as QUICK_BOOKS_GET_TAX_RATES_BATCH } from '../QuickBooksGetTaxRatesBatch';

let tester: NodeTester;

describe('Tests for QuickBooksGetTaxRatesBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(QUICK_BOOKS_GET_TAX_RATES_BATCH);
    });
});
