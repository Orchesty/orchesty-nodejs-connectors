import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/mergado';
import { container } from '../../../../test/TestAbstract';
import { NAME as MERGADO_GET_USER_CONNECTOR } from '../MergadoGetUserConnector';

let tester: NodeTester;

describe('Tests for MergadoGetUserConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MERGADO_GET_USER_CONNECTOR);
    });
});
