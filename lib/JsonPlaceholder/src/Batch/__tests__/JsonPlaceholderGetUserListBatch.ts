import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as JSON_PLACEHOLDER_GET_USER_LIST_BATCH } from '../JsonPlaceholderGetUserListBatch';

let tester: NodeTester;

describe('Tests for JsonPlaceholderGetUserListBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(JSON_PLACEHOLDER_GET_USER_LIST_BATCH);
    });
});
