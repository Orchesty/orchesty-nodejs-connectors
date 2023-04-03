import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as MONEY_S4_GET_COMPANIES } from '../MoneyS4GetCompanies';
import init from "../../../../test/Implementation/moneys4";
import {appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER} from "../../../../test/DataProvider";
import {NAME} from "../../MoneyS4Application";
import CoreFormsEnum from "@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum";
import {TOKEN} from "@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication";

let tester: NodeTester;

describe('Tests for MoneyS4GetCompanies', () => {
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
        await tester.testConnector(MONEY_S4_GET_COMPANIES);
    });

    it('process - with filter', async () => {
        await tester.testConnector(MONEY_S4_GET_COMPANIES, 'filter');
    });
});
