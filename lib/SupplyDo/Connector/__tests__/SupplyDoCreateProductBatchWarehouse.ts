import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/supplyDo';
import { container } from '../../../../test/TestAbstract';
import { NAME as SUPPLY_DO_CREATE_PRODUCT_BATCH_WAREHOUSE } from '../SupplyDoCreateProductBatchWarehouse';

let tester: NodeTester;

describe('Tests for SupplyDoCreateProductBatchWarehouse', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        await tester.testConnector(SUPPLY_DO_CREATE_PRODUCT_BATCH_WAREHOUSE);
    });
});
