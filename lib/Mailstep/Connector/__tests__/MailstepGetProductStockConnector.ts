import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/mailstep';
import { container } from '../../../../test/TestAbstract';
import { NAME as MAILSTEP_GET_PRODUCT_STOCK_CONNECTOR } from '../MailstepGetProductStockConnector';

let tester: NodeTester;

describe('Tests for MailstepGetProductStockConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MAILSTEP_GET_PRODUCT_STOCK_CONNECTOR);
    });
});
