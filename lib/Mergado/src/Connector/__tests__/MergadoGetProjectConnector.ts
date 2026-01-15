import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as MERGADO_GET_PROJECT_CONNECTOR } from '../MergadoGetProjectConnector';

let tester: NodeTester;

describe('Tests for MergadoGetProjectConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MERGADO_GET_PROJECT_CONNECTOR);
    });
});
