import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as JSON_PLACEHOLDER_GET_POST_CONNECTOR } from '../JsonPlaceholderGetPostConnector';

let tester: NodeTester;

describe('Tests for JsonPlaceholderGetPostConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process batch - ok', async () => {
        await tester.testConnector(JSON_PLACEHOLDER_GET_POST_CONNECTOR);
    });
});
