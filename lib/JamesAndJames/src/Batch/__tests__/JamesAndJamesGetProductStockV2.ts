import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../test/dataProvider';
import { NAME as JAMES_AND_JAMES_GET_PRODUCT_STOCK } from '../JamesAndJamesGetProductStockV2';

let tester: NodeTester;

describe('Tests for JamesAndJamesGetProductStockV2', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        await tester.testBatch(JAMES_AND_JAMES_GET_PRODUCT_STOCK);
    });
});
