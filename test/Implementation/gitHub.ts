import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import GitHubGeRespositoriesBatch from '../../lib/GitHub/Batch/GitHubRepositoriesBatch';
import GitHubGetAppConnector from '../../lib/GitHub/Connector/GitHubGetAppConnector';
import GitHubGetRepositoryConnector from '../../lib/GitHub/Connector/GitHubGetRepositoryConnector';
import GitHubApplication, { NAME as GITHUB_APP } from '../../lib/GitHub/GitHubApplication';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(GITHUB_APP, DEFAULT_USER, {
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
