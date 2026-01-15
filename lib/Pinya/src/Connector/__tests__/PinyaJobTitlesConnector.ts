import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initPinyaIntegrationTest } from '../../../test/dataProvider';
import { PINYA_JOB_TITLES_CONNECTOR } from '../PinyaJobTitlesConnector';

let tester: NodeTester;

describe('Tests for PinyaJobTitlesConnector', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await initPinyaIntegrationTest();
    });

    it('process - ok', async () => {
        await tester.testConnector(PINYA_JOB_TITLES_CONNECTOR);
    });
});
