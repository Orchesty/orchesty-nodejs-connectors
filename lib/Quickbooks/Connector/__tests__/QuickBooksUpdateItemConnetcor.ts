import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../../test/TestAbstract';
import { NAME as QUICK_BOOKS_UPDATE_ITEM_CONNETCOR } from '../QuickBooksUpdateItemConnector';

let tester: NodeTester;

describe('Tests for QuickBooksUpdateItemConnetcor', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
  });

  it('process - ok', async () => {
    await tester.testConnector(QUICK_BOOKS_UPDATE_ITEM_CONNETCOR);
  });
});
