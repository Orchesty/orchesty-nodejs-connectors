import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/mailstep';
import { container } from '../../../../test/TestAbstract';
import { NAME as MAILSTEP_GET_INBOUND_RECEIPT_LIST_BATCH } from '../MailstepGetInboundReceiptListBatch';

let tester: NodeTester;

describe('Tests for MailstepGetInboundReceiptListBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(MAILSTEP_GET_INBOUND_RECEIPT_LIST_BATCH);
    });
});
