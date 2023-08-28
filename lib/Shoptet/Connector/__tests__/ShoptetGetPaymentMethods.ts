import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/shoptet';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPTET_GET_PAYMENT_METHODS } from '../ShoptetGetPaymentMethods';

let tester: NodeTester;

describe('Tests for ShoptetGetPaymentMethods', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        mock();
        await tester.testConnector(SHOPTET_GET_PAYMENT_METHODS);
    });
});
