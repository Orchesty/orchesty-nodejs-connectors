import { container } from '@orchesty/nodejs-sdk';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initFabisIntegrationTest } from '../../../../test/Implementation/fabis';
import { FABIS_IMPORT_BATCH_CONNECTOR } from '../FabisImportBatchConnector';

let tester: NodeTester;

describe('Tests for FabisImportBatchConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        initFabisIntegrationTest();
    });

    it('process - ok', async () => {
        await tester.testConnector(FABIS_IMPORT_BATCH_CONNECTOR);
    });
});
