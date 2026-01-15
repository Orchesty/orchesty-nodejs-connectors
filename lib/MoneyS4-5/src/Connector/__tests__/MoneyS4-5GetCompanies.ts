import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, moneyAppInstall } from '../../../test/dataProvider';
import { NAME as MONEY_S4_5_GET_COMPANIES } from '../MoneyS4-5GetCompanies';

let tester: NodeTester;

describe('Tests for MoneyS4GetCompanies', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    beforeEach(() => {
        moneyAppInstall();
    });

    it('process - ok', async () => {
        await tester.testConnector(MONEY_S4_5_GET_COMPANIES);
    });

    it('process - with filter', async () => {
        await tester.testConnector(MONEY_S4_5_GET_COMPANIES, 'filter');
    });
});
