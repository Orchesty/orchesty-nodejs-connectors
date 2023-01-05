import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/monday';
import { container } from '../../../../test/TestAbstract';
import { NAME as MONDAY_CREATE_ITEM_CONNECTOR } from '../MondayCreateItemConnector';

let tester: NodeTester;

describe('Tests for MondayCreateItemConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MONDAY_CREATE_ITEM_CONNECTOR);
    });
});
