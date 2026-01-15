import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initAuthenticaTest } from '../../../test/dataProvider';
import { NAME as AUTHENTICA_GET_STOCK } from '../AuthenticaGetStock';

let tester: NodeTester;

describe('Tests for AuthenticaGetStock', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await initAuthenticaTest();
    });

    afterAll(async () => {
        await container.get(Redis).close();
    });

    it('process - ok', async () => {
        await tester.testBatch(AUTHENTICA_GET_STOCK);
    });

    it('process - nok', async () => {
        await tester.testBatch(AUTHENTICA_GET_STOCK, 'nok');
    });
});
