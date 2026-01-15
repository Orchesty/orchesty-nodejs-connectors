import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import JsonPlaceholderGetCommentListBatch from '../src/Batch/JsonPlaceholderGetCommentListBatch';
import JsonPlaceholderGetPostListBatch from '../src/Batch/JsonPlaceholderGetPostListBatch';
import JsonPlaceholderGetUserListBatch from '../src/Batch/JsonPlaceholderGetUserListBatch';
import JsonPlaceholderGetCommentConnector from '../src/Connector/JsonPlaceholderGetCommentConnector';
import JsonPlaceholderGetPostConnector from '../src/Connector/JsonPlaceholderGetPostConnector';
import JsonPlaceholderGetUserConnector from '../src/Connector/JsonPlaceholderGetUserConnector';
import JsonPlaceholderApplication, { NAME as JSON_PLACEHOLDER_APP } from '../src/JsonPlaceholderApplication';

export default function init(): void {
    appInstall(JSON_PLACEHOLDER_APP, DEFAULT_USER, {});

    const app = new JsonPlaceholderApplication();

    container.setNode(new JsonPlaceholderGetCommentListBatch(), app);
    container.setNode(new JsonPlaceholderGetPostListBatch(), app);
    container.setNode(new JsonPlaceholderGetUserListBatch(), app);
    container.setNode(new JsonPlaceholderGetCommentConnector(), app);
    container.setNode(new JsonPlaceholderGetPostConnector(), app);
    container.setNode(new JsonPlaceholderGetUserConnector(), app);
}
