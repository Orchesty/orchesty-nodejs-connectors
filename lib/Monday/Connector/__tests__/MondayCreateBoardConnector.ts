import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/monday';
import { container } from '../../../../test/TestAbstract';
import { NAME as MONDAY_CREATE_BOARD } from '../MondayCreateBoardConnector';

let tester: NodeTester;

describe('Tests for MondayCreateBoardConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MONDAY_CREATE_BOARD);
    });
});
