import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import CoreServices from '@orchesty/nodejs-sdk/dist/lib/DIContainer/CoreServices';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import { NAME as SHOPTET_JOB_FINISHED_WEBHOOK } from '../ShoptetJobFinishedWebhook';
import { container } from '../../../../test/TestAbstract';
import { shoptetApp } from '../../../../test/DataProvider';
import { NAME as Shoptet } from '../../../../test/Implementation/ImplPluginShoptetApplication';

let tester: NodeTester;

describe('Tests for ShoptetJobFinishedWebhook', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await shoptetApp();
    const cacheKey = `${Shoptet}ApiKey_TestUser`;

    const redisService = container.get(CoreServices.REDIS) as Redis;
    await redisService.set(
      cacheKey,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      JSON.stringify({ expires_in: 55, access_token: 'testToken' }),
      5,
    );
  });

  it('process - ok', async () => {
    await tester.testConnector(SHOPTET_JOB_FINISHED_WEBHOOK);
  });
});
