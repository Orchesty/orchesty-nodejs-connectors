import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initAuthenticaTest } from '../../../../test/Implementation/authentica';
import { container } from '../../../../test/TestAbstract';
import { NAME } from '../AuthenticaGetStockAvailable';

let tester: NodeTester;

describe('Test AuthenticaGetStockAvailable', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await initAuthenticaTest();
    });

    afterAll(async () => {
        await container.get(Redis).close();
    });

    it('process', async () => {
        await tester.testBatch(NAME);
    });
});
