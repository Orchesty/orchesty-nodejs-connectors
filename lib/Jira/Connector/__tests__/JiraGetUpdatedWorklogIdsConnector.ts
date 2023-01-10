import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/jira';
import { container } from '../../../../test/TestAbstract';
import { NAME as JIRA_GET_UPDATED_WORKLOG_IDS_CONNECTOR } from '../JiraGetUpdatedWorklogIdsConnector';

let tester: NodeTester;

describe('Tests for JiraGetUpdatedWorklogIdsConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(JIRA_GET_UPDATED_WORKLOG_IDS_CONNECTOR);
    });
});
