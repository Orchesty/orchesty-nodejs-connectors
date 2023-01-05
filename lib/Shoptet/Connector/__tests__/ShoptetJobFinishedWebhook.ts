import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/shoptet';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPTET_JOB_FINISHED_WEBHOOK } from '../ShoptetJobFinishedWebhook';

let tester: NodeTester;

describe('Tests for ShoptetJobFinishedWebhook', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        mock();
        await tester.testConnector(SHOPTET_JOB_FINISHED_WEBHOOK);
    });
});
