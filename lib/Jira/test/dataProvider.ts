import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import {
    PASSWORD,
    USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import JiraGetServicedeskOrgsBatch from '../src/Batch/JiraGetServicedeskOrgsBatch';
import JiraGetUpdatedWorklogIdsBatch from '../src/Batch/JiraGetUpdatedWorklogIdsBatch';
import JiraCreateIssueConnector from '../src/Connector/JiraCreateIssueConnector';
import JiraGetIssueConnector from '../src/Connector/JiraGetIssueConnector';
import JiraGetWorklogsConnector from '../src/Connector/JiraGetWorklogsConnector';
import JiraApplication, { BUG_TYPE, HOST_URL, ISSUE_TYPE_FROM, NAME as JIRA_APP, TASK_TYPE } from '../src/JiraApplication';

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
