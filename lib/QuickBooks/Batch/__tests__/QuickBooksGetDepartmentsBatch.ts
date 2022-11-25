import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/quickBooks';
import { container } from '../../../../test/TestAbstract';
import { NAME as QUICK_BOOKS_GET_DEPARTMENTS_BATCH } from '../QuickBooksGetDepartmentsBatch';

let tester: NodeTester;

describe('Tests for QuickBooksGetDepartmentsBatch', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testBatch(QUICK_BOOKS_GET_DEPARTMENTS_BATCH);
    });
});
