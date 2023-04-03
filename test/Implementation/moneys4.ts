import MoneyS4Application, { NAME } from '../../lib/MoneyS4/MoneyS4Application';
import {cacheService, container} from "../TestAbstract";
import MoneyS4GetCompanies from "../../lib/MoneyS4/Connector/MoneyS4GetCompanies";
import Redis from "@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis";

export default async function init(): Promise<void> {
    const cacheKey = `${NAME}ApiKey_TestUser`;

    const redisService = container.get(Redis);
    await redisService.set(
        cacheKey,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        JSON.stringify({expires_in: 55, access_token: 'testToken'}),
        10,
    );

    const app = new MoneyS4Application(cacheService);
    container.setApplication(app);

    container.setNode(new MoneyS4GetCompanies(), app);
}
