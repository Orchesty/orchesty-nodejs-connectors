import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import MoneyS45CreateCompany from '../../lib/MoneyS4-5/Connector/MoneyS4-5CreateCompany';
import MoneyS45CreateIssuedInvoice from '../../lib/MoneyS4-5/Connector/MoneyS4-5CreateIssuedInvoice';
import MoneyS45GetCompanies from '../../lib/MoneyS4-5/Connector/MoneyS4-5GetCompanies';
import MoneyS4Application, { NAME } from '../../lib/MoneyS4-5/MoneyS4Application';
import { cacheService, container } from '../TestAbstract';

export default async function init(): Promise<void> {
    const cacheKey = `${NAME}ApiKey_TestUser`;

    const redisService = container.get(Redis);
    await redisService.set(
        cacheKey,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        JSON.stringify({ expires_in: 55, access_token: 'testToken' }),
        10,
    );

    const app = new MoneyS4Application(cacheService);
    container.setApplication(app);

    container.setNode(new MoneyS45GetCompanies(), app);
    container.setNode(new MoneyS45CreateCompany(), app);
    container.setNode(new MoneyS45CreateIssuedInvoice(), app);
}
