import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import {
    PASSWORD,
    USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
// import JiraCreateNewIssueConnector
//     from '../../lib/Jira/Connector/JiraCreateNewIssueConnector';
import JiraGetIssueConnector from '../../lib/Jira/Connector/JiraGetIssueConnector';
import JiraGetServicedeskOrgsConnector from '../../lib/Jira/Connector/JiraGetServicedeskOrgsConnector';
import JiraGetUpdatedWorklogIdsConnector from '../../lib/Jira/Connector/JiraGetUpdatedWorklogIdsConnector';
import JiraGetWorklogsConnector from '../../lib/Jira/Connector/JiraGetWorklogsConnector';
import JiraApplication, {
    NAME as JIRA_APP,
} from '../../lib/Jira/JiraApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default function init(): void {
    appInstall(JIRA_APP, DEFAULT_USER, {
        // TODO test authorization form
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [USER]: 'info@examle.com',
            [PASSWORD]: 'api_key',
        },
    });

    const app = new JiraApplication();
    container.setApplication(app);

    // TODO test if connector JiraCreateNewIssueConnector actually works
    // const createNewIssue = new JiraCreateNewIssueConnector();
    // createNewIssue
    //     .setSender(sender)
    //     .setDb(db)
    //     .setApplication(app);
    // container.setConnector(createNewIssue);

    const createGetIssue = new JiraGetIssueConnector();
    createGetIssue.setSender(sender).setDb(db).setApplication(app);
    container.setConnector(createGetIssue);

    const createGetUpdatedWorklogIds = new JiraGetUpdatedWorklogIdsConnector();
    createGetUpdatedWorklogIds.setSender(sender).setDb(db).setApplication(app);
    container.setConnector(createGetUpdatedWorklogIds);

    const createGetWorklogs = new JiraGetWorklogsConnector();
    createGetWorklogs.setSender(sender).setDb(db).setApplication(app);
    container.setConnector(createGetWorklogs);

    const createGetServicedeskOrgs = new JiraGetServicedeskOrgsConnector();
    createGetServicedeskOrgs.setSender(sender).setDb(db).setApplication(app);
    container.setConnector(createGetServicedeskOrgs);
}
