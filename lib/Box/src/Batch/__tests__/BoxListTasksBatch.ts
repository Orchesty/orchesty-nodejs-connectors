import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as BOX_LIST_TASKS_BATCH } from '../BoxListTasksBatch';

let tester: NodeTester;

describe('Tests for BoxListTasksBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(BOX_LIST_TASKS_BATCH);
    });
});
