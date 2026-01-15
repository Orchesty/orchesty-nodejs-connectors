import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as PAYPAL_CREATE_PRODUCT_CONNECTOR } from '../PaypalCreateProductConnector';

let tester: NodeTester;

describe('Tests for PaypalCreateProductConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(PAYPAL_CREATE_PRODUCT_CONNECTOR);
    });
});
