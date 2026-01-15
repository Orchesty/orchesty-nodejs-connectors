import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../test/dataProvider';
import { NAME as WOO_COMMERCE_GET_PRODUCT_VARIANT } from '../WooCommerceGetProductVariant';

let tester: NodeTester;

describe('Tests for WooCommerceGetProductVariant', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    beforeEach(() => {
        mock();
    });

    it('process - ok', async () => {
        await tester.testConnector(WOO_COMMERCE_GET_PRODUCT_VARIANT);
    });

    it('process - nok', async () => {
        await tester.testConnector(WOO_COMMERCE_GET_PRODUCT_VARIANT, 'nok');
    });
});
