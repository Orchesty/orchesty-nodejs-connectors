import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/mergado';
import { container } from '../../../../test/TestAbstract';
import { NAME as MERGADO_CREATE_ELEMENT_CONNECTOR } from '../MergadoCreateElementConnector';

let tester: NodeTester;

describe('Tests for MergadoCreateElementConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MERGADO_CREATE_ELEMENT_CONNECTOR);
    });
});
