import {
    appInstall,
    DEFAULT_ACCESS_TOKEN,
    DEFAULT_CLIENT_ID,
    DEFAULT_CLIENT_SECRET,
    DEFAULT_USER,
} from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-sdk';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import CacheService from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import { getEnv } from '@orchesty/nodejs-sdk/dist/lib/Config/Config';
import DatabaseClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Database/Client';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import FabisImportBatchConnector from '../src/Connector/FabisImportBatchConnector';
import FabisApplication, { FABIS_APPLICATION } from '../src/FabisApplication';

export async function initFabisIntegrationTest(): Promise<void> {
    appInstall(FABIS_APPLICATION, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });

    const sender = container.get(CurlSender);
    const db = container.get(DatabaseClient);
    if (!container.has(Redis)) {
        container.set(new Redis(getEnv('REDIS_DSN')));
    }
    const redisService = container.get(Redis);

    if (!container.has(CacheService)) {
        container.set(new CacheService(redisService, sender));
    }
    const cacheService = container.get(CacheService);

    const app = new FabisApplication(cacheService);
    container.setApplication(app);

    const importBatch = new FabisImportBatchConnector();
    importBatch
        .setSender(sender)
        .setDb(db)
        .setApplication(app);

    container.setNode(importBatch);

    await redisService.set(
        'fabis-accessKey',
        JSON.stringify({
            access_token: 'accessToken',
            token_type: 'Bearer',
            expires_in: new Date().getTime() + 1_000,
        }),
        100,
    );
}
