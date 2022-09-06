import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { mockDate, restoreDate } from '../../../../.jest/testLifecycle';
import init from '../../../../test/Implementation/shoptet';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPTET_GET_ORDER_CHANGES_LIST } from '../ShoptetGetOrderChangesList';

let tester: NodeTester;

describe('Tests for ShoptetGetOrderChangesList', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        mockDate();
        await tester.testBatch(SHOPTET_GET_ORDER_CHANGES_LIST);
        restoreDate();
    });

    it('process - with after', async () => {
        const repository = container.getRepository(ApplicationInstall);
        const app = await repository.findOne({ key: 'shoptet' });
        if (app) {
            app?.addNonEncryptedSettings({ lastRunListOrderChanges: '2017-03-23T17:03:12Z' });
            await repository.update(app);
        }
        await tester.testBatch(SHOPTET_GET_ORDER_CHANGES_LIST, 'with-after');
    });
});
