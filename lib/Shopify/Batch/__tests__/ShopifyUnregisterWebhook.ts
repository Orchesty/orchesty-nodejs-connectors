import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import CoreServices from '@orchesty/nodejs-sdk/dist/lib/DIContainer/CoreServices';
import MongoDbClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Mongodb/Client';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { DEFAULT_USER } from '../../../../test/DataProvider';
import init from '../../../../test/Implementation/shopify';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPIFY_UNREGISTER_WEBHOOK } from '../ShopifyUnregisterWebhook';

let tester: NodeTester;

describe('Tests for ShopifyUnregisterWebhook', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        const mongoService = container.get<MongoDbClient>(CoreServices.MONGO);
        const repo = await mongoService.getRepository(Webhook);
        await repo.upsert(new Webhook()
            .setWebhookId('4455555555')
            .setUser(DEFAULT_USER)
            .setNode('testNode')
            .setToken('testToken')
            .setApplication('shopify')
            .setTopology('testTopology')
            .setName('orders/create'));
        await tester.testBatch(SHOPIFY_UNREGISTER_WEBHOOK);
    });
});
