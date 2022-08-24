import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { mondayApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as MONDAY_CREATE_ITEM_CONNECTOR } from '../MondayCreateItemConnector';

let tester: NodeTester;

describe('Tests for MondayCreateItemConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await mondayApp();
    });

    it('process - ok', async () => {
        await tester.testConnector(MONDAY_CREATE_ITEM_CONNECTOR);
    });
});
