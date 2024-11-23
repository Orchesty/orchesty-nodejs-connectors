import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import MoneyS45CreateCompany from '../../lib/MoneyS4-5/Connector/MoneyS4-5CreateCompany';
import MoneyS45CreateIssuedInvoice from '../../lib/MoneyS4-5/Connector/MoneyS4-5CreateIssuedInvoice';
import MoneyS45GetCompanies from '../../lib/MoneyS4-5/Connector/MoneyS4-5GetCompanies';
import MoneyS4Application, { NAME } from '../../lib/MoneyS4-5/MoneyS4Application';
import { MONEYS_URL } from '../../lib/MoneyS4-5/MoneyS45Base';
import { appInstall, DEFAULT_CLIENT_ID, DEFAULT_CLIENT_SECRET, DEFAULT_USER } from '../DataProvider';
import { cacheService, container } from '../TestAbstract';

export async function init(): Promise<void> {
    const cacheKey = `${NAME}ApiKey_TestUser`;

    const redisService = container.get(Redis);
    await redisService.set(
        cacheKey,

        JSON.stringify({ expires_in: 55, access_token: 'testToken' }),
        10,
    );

    const app = new MoneyS4Application(cacheService);
    container.setApplication(app);
    container.setNode(new MoneyS45GetCompanies(), app);
    container.setNode(new MoneyS45CreateCompany(), app);
    container.setNode(new MoneyS45CreateIssuedInvoice(), app);
}

export function moneyAppInstall(): ApplicationInstall {
    return appInstall(NAME, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [MONEYS_URL]: 'https://example-money.com',
        },
    });
}
