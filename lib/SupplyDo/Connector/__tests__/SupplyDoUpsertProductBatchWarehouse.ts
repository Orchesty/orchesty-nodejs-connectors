import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/supplyDo';
import { container } from '../../../../test/TestAbstract';
import { NAME as SUPPLY_DO_UPSERT_PRODUCT_BATCH_WAREHOUSE } from '../SupplyDoUpsertProductBatchWarehouse';

let tester: NodeTester;

describe('Tests for SupplyDoUpsertProductBatchWarehouse', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        await tester.testConnector(SUPPLY_DO_UPSERT_PRODUCT_BATCH_WAREHOUSE);
    });
});
