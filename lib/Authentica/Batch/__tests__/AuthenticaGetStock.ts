import CoreServices from '@orchesty/nodejs-sdk/dist/lib/DIContainer/CoreServices';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/authentica';
import { container } from '../../../../test/TestAbstract';
import { NAME as AUTHENTICA_GET_STOCK } from '../AuthenticaGetStock';

let tester: NodeTester;
let redis: Redis;

describe('Tests for AuthenticaGetStock', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        redis = container.get(CoreServices.REDIS);
        await init();
    });

    beforeEach(async () => {
        await redis.remove('authentica_cache_key');
        await redis.set(
            'authentica_cache_key',
            JSON.stringify({
                expiration: 1759965308,
                /* eslint-disable @typescript-eslint/naming-convention */
                access_token: 'testAccessToken',
                refresh_token: 'testRefreshToken',
                refresh_token_expiration: 1759965308,
                /* eslint-enable @typescript-eslint/naming-convention */
            }),
            4,
        );
    });

    it('process - ok', async () => {
        await tester.testBatch(AUTHENTICA_GET_STOCK);
    });

    it('process - nok', async () => {
        await tester.testBatch(AUTHENTICA_GET_STOCK, 'nok');
    });
});
