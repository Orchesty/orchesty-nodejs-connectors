import { container as c, initiateContainer } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import CacheService from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import DIContainer from '@orchesty/nodejs-sdk/dist/lib/DIContainer/Container';
import DatabaseClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Database/Client';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';

/* eslint-disable import/no-mutable-exports */
export let container: DIContainer;
export let db: DatabaseClient;
export let sender: CurlSender;
export let oauth2Provider: OAuth2Provider;
export let redis: Redis;
export let cacheService: CacheService;
/* eslint-enable import/no-mutable-exports */

let initiated = false;

export function prepare(): void {
    if (initiated) {
        return;
    }

    initiateContainer();
    container = c;
    db = container.get(DatabaseClient);
    sender = container.get(CurlSender);
    oauth2Provider = container.get(OAuth2Provider);

    redis = new Redis(process.env.REDIS_DSN ?? '');
    container.set(redis);

    cacheService = new CacheService(redis, sender);
    container.set(cacheService);

    initiated = true;
}
