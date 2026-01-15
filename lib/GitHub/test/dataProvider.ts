import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import GitHubGeRespositoriesBatch from '../src/Batch/GitHubRepositoriesBatch';
import GitHubGetAppConnector from '../src/Connector/GitHubGetAppConnector';
import GitHubGetRepositoryConnector from '../src/Connector/GitHubGetRepositoryConnector';
import GitHubApplication, { NAME as GITHUB_APP } from '../src/GitHubApplication';

export default function init(): void {
    appInstall(GITHUB_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [TOKEN]: DEFAULT_ACCESS_TOKEN,
        },
    });

    const app = new GitHubApplication();
    container.setApplication(app);

    const getApp = new GitHubGetAppConnector();
    const getRepositories = new GitHubGeRespositoriesBatch();
    const getRepository = new GitHubGetRepositoryConnector();

    getApp
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getApp);

    getRepositories
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getRepositories);
    getRepository
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getRepository);
}
