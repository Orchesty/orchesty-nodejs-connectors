import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/jira';
import { container } from '../../../../test/TestAbstract';
import { NAME as JIRA_GET_UPDATED_WORKLOG_IDS_BATCH } from '../JiraGetUpdatedWorklogIdsBatch';

let tester: NodeTester;

describe('Tests for JiraGetUpdatedWorklogIdsBatch', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(JIRA_GET_UPDATED_WORKLOG_IDS_BATCH);
    });
});
