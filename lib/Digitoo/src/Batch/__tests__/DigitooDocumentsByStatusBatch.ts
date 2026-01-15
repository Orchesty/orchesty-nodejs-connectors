import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as DIGITOO_DOCUMENTS_BY_STATUS_BATCH } from '../DigitooDocumentsByStatusBatch';

let tester: NodeTester;

describe('Tests for DigitooDocumentsByStatusBatch', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(DIGITOO_DOCUMENTS_BY_STATUS_BATCH);
    });
});
