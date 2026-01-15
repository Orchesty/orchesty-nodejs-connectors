import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as BOX_GET_COLLABORATION_CONNECTOR } from '../BoxGetCollaborationConnector';

let tester: NodeTester;

describe('Tests for BoxGetCollaborationConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(BOX_GET_COLLABORATION_CONNECTOR);
    });
});
