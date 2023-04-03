import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../../../../test/DataProvider';
import init from '../../../../test/Implementation/moneys4-5';
import { container } from '../../../../test/TestAbstract';
import { NAME } from '../../MoneyS4Application';
import { NAME as MONEY_S4_5_CREATE_ISSUED_INVOICE } from '../MoneyS4-5CreateIssuedInvoice';

let tester: NodeTester;

describe('Tests for MoneyS4CreateIssuedInvoice', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    beforeEach(() => {
        appInstall(NAME, DEFAULT_USER, {
            [CoreFormsEnum.AUTHORIZATION_FORM]: {
                [TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        });
    });

    it('process - ok', async () => {
        await tester.testConnector(MONEY_S4_5_CREATE_ISSUED_INVOICE);
    });
});
