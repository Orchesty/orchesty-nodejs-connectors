import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as WFLOW_GET_DOCUMENT_TYPES_CONNECTOR } from '../WflowGetDocumentTypesConnector';

let tester: NodeTester;

describe('Tests for WflowGetDocumentTypesConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(WFLOW_GET_DOCUMENT_TYPES_CONNECTOR);
    });
});
