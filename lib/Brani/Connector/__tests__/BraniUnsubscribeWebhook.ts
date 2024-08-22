import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/brani';
import { container } from '../../../../test/TestAbstract';
import { NAME as BRANI_UNSUBSCRIBE_WEBHOOK } from '../BraniUnsubscribeWebhook';

let tester: NodeTester;

describe('Tests for BraniUnsubscribeWebhook', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(BRANI_UNSUBSCRIBE_WEBHOOK);
    });
});
