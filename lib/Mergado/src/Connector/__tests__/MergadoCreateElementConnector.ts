import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as MERGADO_CREATE_ELEMENT_CONNECTOR } from '../MergadoCreateElementConnector';

let tester: NodeTester;

describe('Tests for MergadoCreateElementConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MERGADO_CREATE_ELEMENT_CONNECTOR);
    });
});
