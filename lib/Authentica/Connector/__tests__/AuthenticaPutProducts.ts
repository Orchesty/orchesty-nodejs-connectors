import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initAuthenticaTest } from '../../../../test/Implementation/authentica';
import { container } from '../../../../test/TestAbstract';
import { NAME as AUTHENTICA_POST_PRODUCTS } from '../AuthenticaPutProducts';

let tester: NodeTester;
let redis: Redis;

describe('Tests for AuthenticaPostProducts', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        redis = container.get(Redis);
        await initAuthenticaTest();
    });

    afterAll(async () => {
        await redis.close();
    });

    it('process - ok', async () => {
        await redis.set(
            'authentica_cache_key',
            JSON.stringify({
                expiration: 1759965308,

                access_token: 'testAccessToken',
                refresh_token: 'testRefreshToken',
                refresh_token_expiration: 1759965308,

            }),
            4,
        );
        await tester.testConnector(AUTHENTICA_POST_PRODUCTS);
    });
});
