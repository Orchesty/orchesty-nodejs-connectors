import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as ZENDESK_LIST_USERS_BATCH } from '../ZendeskListUsersBatch';

let tester: NodeTester;

describe('Tests for ZendeskListUsersBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(ZENDESK_LIST_USERS_BATCH);
    });
});
