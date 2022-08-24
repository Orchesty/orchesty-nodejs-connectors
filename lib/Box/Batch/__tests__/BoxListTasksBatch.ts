import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { boxApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as BOX_LIST_TASKS_BATCH } from '../BoxListTasksBatch';

let tester: NodeTester;

describe('Tests for BoxListTasksBatch', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await boxApp();
    });

    it('process - ok', async () => {
        await tester.testBatch(BOX_LIST_TASKS_BATCH);
    });
});
