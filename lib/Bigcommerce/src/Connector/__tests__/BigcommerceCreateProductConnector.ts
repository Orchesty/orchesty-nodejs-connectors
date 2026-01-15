import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as BIGCOMMERCE_CREATE_PRODUCT_CONNECTOR } from '../BigcommerceCreateProductConnector';

let tester: NodeTester;

describe('Tests for BigcommerceCreateProductConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(BIGCOMMERCE_CREATE_PRODUCT_CONNECTOR);
    });
});
