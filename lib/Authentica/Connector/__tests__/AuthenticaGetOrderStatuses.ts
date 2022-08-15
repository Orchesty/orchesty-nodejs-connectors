import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import CoreServices from '@orchesty/nodejs-sdk/dist/lib/DIContainer/CoreServices';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import { container } from '../../../../test/TestAbstract';
import { NAME as AUTHENTICA_GET_ORDER_STATUSES } from '../AuthenticaGetOrderStatuses';
import init from '../../../../test/Implementation/authentica';

let tester: NodeTester;
let redis: Redis;

describe('Tests for AuthenticaGetOrderStatuses', () => {
  beforeAll(async () => {
    tester = new NodeTester(container, __filename, true);
    redis = container.get(CoreServices.REDIS);
    await init();
  });

  beforeEach(async () => {
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
    await tester.testConnector(AUTHENTICA_GET_ORDER_STATUSES);
  });
});
