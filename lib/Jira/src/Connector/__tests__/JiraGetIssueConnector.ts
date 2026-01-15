import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as JIRA_GET_ISSUE_CONNECTOR } from '../JiraGetIssueConnector';

let tester: NodeTester;

describe('Tests for JiraGetIssueConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(JIRA_GET_ISSUE_CONNECTOR);
    });
});
