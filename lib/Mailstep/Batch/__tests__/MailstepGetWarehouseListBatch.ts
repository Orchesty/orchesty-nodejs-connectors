import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/mailstep';
import { container } from '../../../../test/TestAbstract';
import { NAME as MAILSTEP_GET_WAREHOUSE_LIST_BATCH } from '../MailstepGetWarehouseListBatch';

let tester: NodeTester;

describe('Tests for MailstepGetWarehouseListBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(MAILSTEP_GET_WAREHOUSE_LIST_BATCH);
    });
});
