import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/brani';
import { container } from '../../../../test/TestAbstract';
import { NAME as BRANI_LIST_WEBHOOK_EVENTS } from '../BraniListWebhookEvents';

let tester: NodeTester;

describe('Tests for BraniListWebhookEvents', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(BRANI_LIST_WEBHOOK_EVENTS);
    });
});
