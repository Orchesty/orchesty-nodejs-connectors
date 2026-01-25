import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as WFLOW_UNSUBSCRIBE_WEBHOOK_BATCH } from '../WflowUnsubscribeWebhookBatch';

let tester: NodeTester;

describe('Tests for WflowUnsubscribeWebhookBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(WFLOW_UNSUBSCRIBE_WEBHOOK_BATCH);
    });
});
