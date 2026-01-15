import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as JIRA_GET_SERVICEDESK_ORGS_BATCH } from '../JiraGetServicedeskOrgsBatch';

let tester: NodeTester;

describe('Tests for JiraGetServicedeskOrgsBatch', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(JIRA_GET_SERVICEDESK_ORGS_BATCH);
    });
});
