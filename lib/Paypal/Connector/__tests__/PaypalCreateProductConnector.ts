import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/paypal';
import { container } from '../../../../test/TestAbstract';
import { NAME as PAYPAL_CREATE_PRODUCT_CONNECTOR } from '../PaypalCreateProductConnector';

let tester: NodeTester;

describe('Tests for PaypalCreateProductConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(PAYPAL_CREATE_PRODUCT_CONNECTOR);
    });
});
