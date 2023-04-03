import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../../../../test/DataProvider';
import init from '../../../../test/Implementation/moneys4';
import { container } from '../../../../test/TestAbstract';
import { NAME } from '../../MoneyS4Application';
import { NAME as MONEY_S4_CREATE_COMPANY } from '../MoneyS4CreateCompany';

let tester: NodeTester;

describe('Tests for MoneyS4CreateCompany', () => {
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
        await tester.testConnector(MONEY_S4_CREATE_COMPANY);
    });
});
