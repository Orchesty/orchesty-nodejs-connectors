import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as WFLOW_SUBSCRIBE_WEBHOOK_BATCH } from '../WflowSubscribeWebhookBatch';

let tester: NodeTester;

describe('Tests for WflowSubscribeWebhookBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(WFLOW_SUBSCRIBE_WEBHOOK_BATCH);
    });
});
