import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { mergadoApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as MERGADO_CREATE_ELEMENT_CONNECTOR } from '../MergadoCreateElementConnector';

let tester: NodeTester;

describe('Tests for MergadoCreateElementConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await mergadoApp();
    });

    it('process - ok', async () => {
        await tester.testConnector(MERGADO_CREATE_ELEMENT_CONNECTOR);
    });
});
