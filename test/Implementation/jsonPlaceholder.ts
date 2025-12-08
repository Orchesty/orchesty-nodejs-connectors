import JsonPlaceholderGetCommentListBatch from '../../lib/JsonPlaceholder/Batch/JsonPlaceholderGetCommentListBatch';
import JsonPlaceholderGetPostListBatch from '../../lib/JsonPlaceholder/Batch/JsonPlaceholderGetPostListBatch';
import JsonPlaceholderGetUserListBatch from '../../lib/JsonPlaceholder/Batch/JsonPlaceholderGetUserListBatch';
import JsonPlaceholderGetCommentConnector from '../../lib/JsonPlaceholder/Connector/JsonPlaceholderGetCommentConnector';
import JsonPlaceholderGetPostConnector from '../../lib/JsonPlaceholder/Connector/JsonPlaceholderGetPostConnector';
import JsonPlaceholderGetUserConnector from '../../lib/JsonPlaceholder/Connector/JsonPlaceholderGetUserConnector';
import JsonPlaceholderApplication, { NAME as JSON_PLACEHOLDER_APP } from '../../lib/JsonPlaceholder/JsonPlaceholderApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

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
