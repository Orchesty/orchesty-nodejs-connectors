import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/woocommerce';
import { container } from '../../../../test/TestAbstract';
import { NAME as WOOCOMMERCE_APP } from '../../WooCommerceApplication';
import { NAME as WOO_COMMERCE_GET_ORDERS } from '../WooCommerceGetOrders';

let tester: NodeTester;

describe('Tests for WooCommerceGetProducts', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testBatch(WOO_COMMERCE_GET_ORDERS);
    });

    it('process - lastRun', async () => {
        const repository = container.getRepository(ApplicationInstall);
        const app = await repository.findOne({ key: WOOCOMMERCE_APP });
        app?.addNonEncryptedSettings({ orderLastRun: '2022-09-22T08:21:27.000Z' });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await repository.update(app!);

        await tester.testBatch(WOO_COMMERCE_GET_ORDERS, 'lastRun');

        app?.addNonEncryptedSettings({});
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await repository.update(app!);
    });
});
