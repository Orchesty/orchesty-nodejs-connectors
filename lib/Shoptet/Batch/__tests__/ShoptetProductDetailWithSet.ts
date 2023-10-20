import DataStorageManager from '@orchesty/nodejs-sdk/dist/lib/Storage/DataStore/DataStorageManager';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { devIp } from '../../../../.jest/testEnvs';
import { init, mock } from '../../../../test/Implementation/shoptet';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPTET_PRODUCT_DETAIL_WITH_SET } from '../ShoptetProductDetailWithSet';

let tester: NodeTester;

describe('Tests for ShoptetProductDetailWithSet', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    beforeEach(() => {
        mockOnce([
            { request: {
                method: HttpMethods.POST,
                url: new RegExp(`http:\\/\\/${devIp}\\/document\\/ApplicationInstall.*`),
            },
            response: {},
            },
        ]);
    });

    it('process - ok', async () => {
        mock();

        await tester.testBatch(SHOPTET_PRODUCT_DETAIL_WITH_SET);
    });

    it('process - ok multiple', async () => {
        mock();

        const dataStorageManager = container.get(DataStorageManager);
        await dataStorageManager.remove('process111');
        await tester.testBatch(SHOPTET_PRODUCT_DETAIL_WITH_SET, 'multiple');
    });

    it('process - ok none', async () => {
        mock();

        await tester.testBatch(SHOPTET_PRODUCT_DETAIL_WITH_SET, 'none');
    });
});
