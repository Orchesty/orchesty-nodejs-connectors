import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as ONESIGNAL_VIEW_APPS_BATCH } from '../OnesignalViewAppsBatch';
import { onesignalApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for OnesignalViewAppsBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await onesignalApp();
  });

  it('process - ok', async () => {
    await tester.testBatch(ONESIGNAL_VIEW_APPS_BATCH);
  });
});
