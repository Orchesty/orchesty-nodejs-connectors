import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/shoptet';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPTET_GET_PRODUCT_CHANGES_LIST } from '../ShoptetGetProductChangesList';

let tester: NodeTester;

describe('Tests for ShoptetGetProductChangesList', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testBatch(SHOPTET_GET_PRODUCT_CHANGES_LIST);
    });

    it('process - with after', async () => {
        const repository = container.getRepository(ApplicationInstall);
        const app = await repository.findOne({ key: 'shoptet' });
        if (app) {
            app?.addNonEncryptedSettings({ lastRunListProductChanges: '2017-03-23T17:03:12Z' });
            await repository.update(app);
        }
        await tester.testBatch(SHOPTET_GET_PRODUCT_CHANGES_LIST, 'with-after');
    });
});
