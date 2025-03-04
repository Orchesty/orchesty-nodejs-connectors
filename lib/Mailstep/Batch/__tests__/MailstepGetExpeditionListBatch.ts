import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/mailstep';
import { container } from '../../../../test/TestAbstract';
import { NAME as MAILSTEP_GET_EXPEDITION_LIST_BATCH } from '../MailstepGetExpeditionListBatch';

let tester: NodeTester;

describe('Tests for MailstepGetExpeditionListBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(MAILSTEP_GET_EXPEDITION_LIST_BATCH);
    });
});
