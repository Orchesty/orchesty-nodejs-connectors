import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/jira';
import { container } from '../../../../test/TestAbstract';
import { NAME as JIRA_CREATE_ISSUE_CONNECTOR } from '../JiraCreateIssueConnector';

let tester: NodeTester;

describe('Tests for JiraCreateIssueConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(JIRA_CREATE_ISSUE_CONNECTOR);
    });
});
