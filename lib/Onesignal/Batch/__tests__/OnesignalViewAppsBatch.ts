import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/oneSignal';
import { container } from '../../../../test/TestAbstract';
import { NAME as ONESIGNAL_VIEW_APPS_BATCH } from '../OnesignalViewAppsBatch';

let tester: NodeTester;

describe('Tests for OnesignalViewAppsBatch', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testBatch(ONESIGNAL_VIEW_APPS_BATCH);
    });
});
