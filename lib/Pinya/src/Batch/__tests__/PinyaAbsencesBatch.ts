import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initPinyaIntegrationTest } from '../../../test/dataProvider';
import { PINYA_ABSENCES_BATCH } from '../PinyaAbsencesBatch';

let tester: NodeTester;

describe('Tests for PinyaAbsencesBatch', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await initPinyaIntegrationTest();
    });

    it('process - ok', async () => {
        await tester.testBatch(PINYA_ABSENCES_BATCH);
    });

    it('process - empty', async () => {
        await tester.testBatch(PINYA_ABSENCES_BATCH, 'empty');
    });
});
