import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/upgates';
import { container } from '../../../../test/TestAbstract';
import { NAME as UPGATES_GET_PRODUCTS } from '../UpgatesGetProducts';

let tester: NodeTester;

describe('Tests for UpgatesGetProducts', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        mock();
        await tester.testBatch(UPGATES_GET_PRODUCTS);
    });

    it('process - lastRun', async () => {
        mock({ productLastRun: '2022-09-22T08:21:27.000Z' });
        await tester.testBatch(UPGATES_GET_PRODUCTS, 'lastRun');
    });

    it('process - productId', async () => {
        mock();
        await tester.testBatch(UPGATES_GET_PRODUCTS, 'productId');
    });

    it('process - productIds', async () => {
        mock();
        await tester.testBatch(UPGATES_GET_PRODUCTS, 'productIds');
    });
});
