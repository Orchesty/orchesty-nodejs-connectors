import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import {
    PASSWORD,
    USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
// import JiraCreateNewIssueConnector
//     from '../../lib/Jira/Connector/JiraCreateNewIssueConnector';
import JiraGetIssueConnector from '../../lib/Jira/Connector/JiraGetIssueConnector';
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
    const createGetIssue = new JiraGetIssueConnector();

    // createNewIssue
    //     .setSender(sender)
    //     .setDb(db)
    //     .setApplication(app);
    // container.setConnector(createNewIssue);

    createGetIssue.setSender(sender).setDb(db).setApplication(app);
    container.setConnector(createGetIssue);
}
