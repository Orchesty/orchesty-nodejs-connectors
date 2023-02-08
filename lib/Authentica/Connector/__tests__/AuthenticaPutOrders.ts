import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/authentica';
import { container } from '../../../../test/TestAbstract';
import { NAME as AUTHENTICA_POST_ORDERS } from '../AuthenticaPutOrders';

let tester: NodeTester;
let redis: Redis;

describe('Tests for AuthenticaPostOrders', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        redis = container.get(Redis);
        init();
    });

    beforeEach(async () => {
        mock();
        await redis.remove('authentica_cache_key');
    });

    it('process - ok', async () => {
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
        await tester.testConnector(AUTHENTICA_POST_ORDERS);
    });
});
