import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as MARKETO_GET_FILES_BATCH } from '../MarketoGetFilesBatch';

let tester: NodeTester;

describe('Tests for MarketoGetFilesBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(MARKETO_GET_FILES_BATCH);
    });
});
