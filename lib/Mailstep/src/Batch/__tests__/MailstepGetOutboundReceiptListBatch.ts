import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as MAILSTEP_GET_OUTBOUND_RECEIPT_LIST_BATCH } from '../MailstepGetOutboundReceiptListBatch';

let tester: NodeTester;

describe('Tests for MailstepGetOutboundReceiptListBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(MAILSTEP_GET_OUTBOUND_RECEIPT_LIST_BATCH);
    });
});
