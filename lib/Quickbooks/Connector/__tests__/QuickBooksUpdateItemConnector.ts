import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as QUICK_BOOKS_UPDATE_ITEM_CONNECTOR } from '../QuickBooksUpdateItemConnector';
import { quickBooksApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for QuickBooksUpdateItemConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await quickBooksApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(QUICK_BOOKS_UPDATE_ITEM_CONNECTOR);
  });
});
