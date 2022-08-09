import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as GREENHOUS_LIST_APP_BATCH } from '../GreenhousListAppBatch';
import { greenHousApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for GreenhousListAppBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await greenHousApp();
  });

  it('process - ok', async () => {
    await tester.testBatch(GREENHOUS_LIST_APP_BATCH);
  });
});
