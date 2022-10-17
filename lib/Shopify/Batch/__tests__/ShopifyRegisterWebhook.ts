import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import CoreServices from '@orchesty/nodejs-sdk/dist/lib/DIContainer/CoreServices';
import MongoDbClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Mongodb/Client';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPIFY_REGISTER_WEBHOOK } from '../ShopifyRegisterWebhook';

let tester: NodeTester;

describe('Tests for ShopifyRegisterWebhook', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        await tester.testBatch(SHOPIFY_REGISTER_WEBHOOK);
        const mongoService = container.get<MongoDbClient>(CoreServices.MONGO);
        const repo = await mongoService.getRepository(Webhook);
        await repo.removeMany({});
    });
});
