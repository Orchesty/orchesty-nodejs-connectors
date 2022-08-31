import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/box';
import { container } from '../../../../test/TestAbstract';
import { NAME as BOX_GET_USER_CONNECTOR } from '../BoxGetUserConnector';

let tester: NodeTester;

describe('Tests for BoxGetUserConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(BOX_GET_USER_CONNECTOR);
    });
});
