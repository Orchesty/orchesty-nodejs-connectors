import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as QUICK_BOOKS_UPDATE_ITEM_CONNECTOR } from '../QuickBooksUpdateItemConnector';

let tester: NodeTester;

describe('Tests for QuickBooksUpdateItemConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(QUICK_BOOKS_UPDATE_ITEM_CONNECTOR);
    });
});
