import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import {
    PASSWORD,
    USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import JiraGetServicedeskOrgsBatch from '../../lib/Jira/Batch/JiraGetServicedeskOrgsBatch';
import JiraGetUpdatedWorklogIdsBatch from '../../lib/Jira/Batch/JiraGetUpdatedWorklogIdsBatch';
import JiraCreateIssueConnector from '../../lib/Jira/Connector/JiraCreateIssueConnector';
import JiraGetIssueConnector from '../../lib/Jira/Connector/JiraGetIssueConnector';
import JiraGetWorklogsConnector from '../../lib/Jira/Connector/JiraGetWorklogsConnector';
import JiraApplication, { BUG_TYPE, HOST_URL, ISSUE_TYPE_FROM, NAME as JIRA_APP, TASK_TYPE } from '../../lib/Jira/JiraApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default function init(): void {
    appInstall(JIRA_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [HOST_URL]: 'https://example.atlassian.net',
            [USER]: 'info@examle.com',
            [PASSWORD]: 'api_key',
        },
        [ISSUE_TYPE_FROM]: {
            [BUG_TYPE]: 0,
            [TASK_TYPE]: 1,
        },
    });

    const app = new JiraApplication();
    container.setApplication(app);

    const createIssue = new JiraCreateIssueConnector();
    createIssue.setSender(sender).setDb(db).setApplication(app);
    container.setConnector(createIssue);

    const createGetIssue = new JiraGetIssueConnector();
    createGetIssue.setSender(sender).setDb(db).setApplication(app);
    container.setConnector(createGetIssue);

    const createGetUpdatedWorklogIds = new JiraGetUpdatedWorklogIdsBatch();
    createGetUpdatedWorklogIds.setSender(sender).setDb(db).setApplication(app);
    container.setBatch(createGetUpdatedWorklogIds);

    const createGetWorklogs = new JiraGetWorklogsConnector();
    createGetWorklogs.setSender(sender).setDb(db).setApplication(app);
    container.setConnector(createGetWorklogs);

    const createGetServicedeskOrgs = new JiraGetServicedeskOrgsBatch();
    createGetServicedeskOrgs.setSender(sender).setDb(db).setApplication(app);
    container.setBatch(createGetServicedeskOrgs);
}
