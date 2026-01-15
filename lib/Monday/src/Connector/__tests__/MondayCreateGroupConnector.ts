import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as MONDAY_CREATE_GROUP_CONNECTOR } from '../MondayCreateGroupConnector';

let tester: NodeTester;

describe('Tests for MondayCreateGroupConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MONDAY_CREATE_GROUP_CONNECTOR);
    });
});
