import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as FAPI_GET_PROJECT_LIST_BATCH } from '../FapiGetProjectListBatch';

let tester: NodeTester;

describe('Tests for FapiGetProjectListBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(FAPI_GET_PROJECT_LIST_BATCH);
    });
});
