import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initPinyaIntegrationTest } from '../../../test/dataProvider';
import { PINYA_EMPLOYEES_BATCH } from '../PinyaEmployeesBatch';

let tester: NodeTester;

describe('Tests for PinyaEmployeesBatch', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await initPinyaIntegrationTest();
    });

    it('process - ok', async () => {
        await tester.testBatch(PINYA_EMPLOYEES_BATCH);
    });
});
