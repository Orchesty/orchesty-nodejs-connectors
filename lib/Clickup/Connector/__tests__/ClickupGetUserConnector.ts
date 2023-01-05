import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/clickup';
import { container } from '../../../../test/TestAbstract';
import { NAME as CLICKUP_GET_USER_CONNECTOR } from '../ClickupGetUserConnector';

let tester: NodeTester;

describe('Tests for ClickupGetUserConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(CLICKUP_GET_USER_CONNECTOR);
    });
});
