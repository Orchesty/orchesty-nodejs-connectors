import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, moneyAppInstall } from '../../../test/dataProvider';
import { NAME as MONEY_S4_5_CREATE_ISSUED_INVOICE } from '../MoneyS4-5CreateIssuedInvoice';

let tester: NodeTester;

describe('Tests for MoneyS4CreateIssuedInvoice', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    beforeEach(() => {
        moneyAppInstall();
    });

    it('process - ok', async () => {
        await tester.testConnector(MONEY_S4_5_CREATE_ISSUED_INVOICE);
    });

    it('process - 500 skip', async () => {
        await tester.testConnector(MONEY_S4_5_CREATE_ISSUED_INVOICE, 'skip');
    });

    it('process - 500 repeat', async () => {
        await tester.testConnector(MONEY_S4_5_CREATE_ISSUED_INVOICE, 'repeat', OnRepeatException);
    });
});
