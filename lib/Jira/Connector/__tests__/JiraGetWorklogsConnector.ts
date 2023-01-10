import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/jira';
import { container } from '../../../../test/TestAbstract';
import { NAME as JIRA_GET_WORKLOGS_CONNECTOR } from '../JiraGetWorklogsConnector';

let tester: NodeTester;

describe('Tests for JiraGetWorklogsConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(JIRA_GET_WORKLOGS_CONNECTOR);
    });
});
