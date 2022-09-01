import { container as c, initiateContainer } from '@orchesty/nodejs-sdk';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import CacheService from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import DIContainer from '@orchesty/nodejs-sdk/dist/lib/DIContainer/Container';
import CoreServices from '@orchesty/nodejs-sdk/dist/lib/DIContainer/CoreServices';
import Metrics from '@orchesty/nodejs-sdk/dist/lib/Metrics/Metrics';
import MongoDbClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Mongodb/Client';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';

/* eslint-disable import/no-mutable-exports */
export let container: DIContainer;
export let db: MongoDbClient;
export let sender: CurlSender;
export let oauth2Provider: OAuth2Provider;
export let redis: Redis;
export let cacheService: CacheService;
/* eslint-enable import/no-mutable-exports */

let initiated = false;

export async function dropCollection(collection: string): Promise<void> {
    const database = await db.db();
    try {
        await database.dropCollection(collection);
    } catch {
        // ...
    }
}

export async function closeConnection(): Promise<void> {
    await db.down();
    await container.get<Metrics>(CoreServices.METRICS).close();
    await container.get<Redis>(CoreServices.REDIS).close();
}

export async function prepare(): Promise<void> {
    if (initiated) {
        return;
    }

    await initiateContainer();
    container = c;
    db = container.get(CoreServices.MONGO);
    sender = container.get(CoreServices.CURL);
    oauth2Provider = container.get(CoreServices.OAUTH2_PROVIDER);

    redis = new Redis(process.env.REDIS_DSN ?? '');
    container.set(CoreServices.REDIS, redis);

    cacheService = new CacheService(redis, sender);
    container.set(CoreServices.CACHE, cacheService);

    await dropCollection(ApplicationInstall.getCollection());
    initiated = true;
}
