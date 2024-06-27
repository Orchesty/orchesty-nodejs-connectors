import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import CacheService from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import { getEnv } from '@orchesty/nodejs-sdk/dist/lib/Config/Config';
import DatabaseClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Database/Client';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import PinyaAbsencesBatch from '../../lib/Pinya/Batch/PinyaAbsencesBatch';
import PinyaEmployeesBatch from '../../lib/Pinya/Batch/PinyaEmployeesBatch';
import { PinyaJobTitlesConnector } from '../../lib/Pinya/Connector/PinyaJobTitlesConnector';
import PinyaApplication, { PINYA_APPLICATION } from '../../lib/Pinya/PinyaApplication';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

export async function initPinyaIntegrationTest(): Promise<void> {
    const sender = container.get(CurlSender);
    const db = container.get(DatabaseClient);
    appInstall(PINYA_APPLICATION, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
        },
    });

    if (!container.has(Redis)) {
        container.set(new Redis(getEnv('REDIS_DSN')));
    }
    const redisService = container.get(Redis);

    if (!container.has(CacheService)) {
        container.set(new CacheService(redisService, sender));
    }
    const cacheService = container.get(CacheService);

    const app = new PinyaApplication(cacheService);
    container.setApplication(app);

    container.setNode(
        new PinyaEmployeesBatch()
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );
    container.setNode(
        new PinyaAbsencesBatch()
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );
    container.setNode(
        new PinyaJobTitlesConnector()
            .setSender(sender)
            .setDb(db)
            .setApplication(app),
    );

    await redisService.set(
        'pinya-accessKey',
        JSON.stringify({
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
            expiration: new Date().getTime() + 1_000,
        }),
        100,
    );
}
