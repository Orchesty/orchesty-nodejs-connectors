import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as PERSONIO_LIST_EMPLOYEES_BATCH } from '../PersonioListEmployeesBatch';

let tester: NodeTester;

describe('Tests for PersonioListEmployeesBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(PERSONIO_LIST_EMPLOYEES_BATCH);
    });
});
