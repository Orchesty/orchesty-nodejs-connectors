import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as WFLOW_UPDATE_DOCUMENT_STATE } from '../WflowUpdateDocumentStateConnector';

let tester: NodeTester;

describe('Tests for WflowUpdateDocumentStateConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(WFLOW_UPDATE_DOCUMENT_STATE);
    });
});
