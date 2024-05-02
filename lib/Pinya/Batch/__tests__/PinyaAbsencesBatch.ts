import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initPinyaIntegrationTest } from '../../../../test/Implementation/pinya';
import { container } from '../../../../test/TestAbstract';
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
});
