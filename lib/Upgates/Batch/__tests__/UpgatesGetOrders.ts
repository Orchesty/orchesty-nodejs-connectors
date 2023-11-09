import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/upgates';
import { container } from '../../../../test/TestAbstract';
import { NAME as UPGATES_GET_ORDERS } from '../UpgatesGetOrders';

let tester: NodeTester;

describe('Tests for UpgatesGetOrders', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        mock();
        await tester.testBatch(UPGATES_GET_ORDERS);
    });

    it('process - lastRun', async () => {
        mock({ orderLastRun: '2022-09-22T08:21:27.000Z' });
        await tester.testBatch(UPGATES_GET_ORDERS, 'lastRun');
    });

    it('process - orderNumber', async () => {
        mock();
        await tester.testBatch(UPGATES_GET_ORDERS, 'orderNumber');
    });

    it('process - orderNumbers', async () => {
        mock();
        await tester.testBatch(UPGATES_GET_ORDERS, 'orderNumbers');
    });
});
