import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initAuthenticaTest } from '../../../../test/Implementation/authentica';
import { container } from '../../../../test/TestAbstract';
import { AUTHENTICA_UPDATE_PRODUCT } from '../AuthenticaUpdateProduct';

let tester: NodeTester;

describe('Tests for AuthenticaUpdateProduct', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await initAuthenticaTest();
    });

    afterAll(async () => {
        await container.get(Redis).close();
    });

    it('process - ok', async () => {
        await tester.testConnector(AUTHENTICA_UPDATE_PRODUCT);
    });
});
