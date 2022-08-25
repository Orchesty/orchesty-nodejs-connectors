import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { clickupApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as CLICKUP_GET_USER_CONNECTOR } from '../ClickupGetUserConnector';

let tester: NodeTester;

describe('Tests for ClickupGetUserConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await clickupApp();
    });

    it('process - ok', async () => {
        await tester.testConnector(CLICKUP_GET_USER_CONNECTOR);
    });
});
