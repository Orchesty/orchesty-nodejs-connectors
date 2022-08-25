import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { onesignalApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as ONESIGNAL_VIEW_APPS_BATCH } from '../OnesignalViewAppsBatch';

let tester: NodeTester;

describe('Tests for OnesignalViewAppsBatch', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await onesignalApp();
    });

    it('process - ok', async () => {
        await tester.testBatch(ONESIGNAL_VIEW_APPS_BATCH);
    });
});
