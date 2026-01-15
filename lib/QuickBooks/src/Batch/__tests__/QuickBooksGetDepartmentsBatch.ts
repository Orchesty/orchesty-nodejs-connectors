import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as QUICK_BOOKS_GET_DEPARTMENTS_BATCH } from '../QuickBooksGetDepartmentsBatch';

let tester: NodeTester;

describe('Tests for QuickBooksGetDepartmentsBatch', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(QUICK_BOOKS_GET_DEPARTMENTS_BATCH);
    });
});
