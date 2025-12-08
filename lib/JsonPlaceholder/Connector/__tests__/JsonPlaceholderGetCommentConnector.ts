import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/jsonPlaceholder';
import { container } from '../../../../test/TestAbstract';
import { NAME as JSON_PLACEHOLDER_GET_COMMENT_CONNECTOR } from '../JsonPlaceholderGetCommentConnector';

let tester: NodeTester;

describe('Tests for JsonPlaceholderGetCommentConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process batch - ok', async () => {
        await tester.testConnector(JSON_PLACEHOLDER_GET_COMMENT_CONNECTOR);
    });
});
