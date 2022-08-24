import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { boxApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as BOX_GET_USER_CONNECTOR } from '../BoxGetUserConnector';

let tester: NodeTester;

describe('Tests for BoxGetUserConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await boxApp();
    });

    it('process - ok', async () => {
        await tester.testConnector(BOX_GET_USER_CONNECTOR);
    });
});
