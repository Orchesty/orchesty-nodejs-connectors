import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as JSON_PLACEHOLDER_GET_COMMENT_LIST_BATCH } from '../JsonPlaceholderGetCommentListBatch';

let tester: NodeTester;

describe('Tests for JsonPlaceholderGetCommentListBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process batch - ok', async () => {
        await tester.testBatch(JSON_PLACEHOLDER_GET_COMMENT_LIST_BATCH);
    });
});
