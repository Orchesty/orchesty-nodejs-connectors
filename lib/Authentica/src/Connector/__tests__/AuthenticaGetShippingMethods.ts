import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initAuthenticaTest } from '../../../test/dataProvider';
import { NAME as AUTHENTICA_GET_SHIPPING_METHODS } from '../AuthenticaGetShippingMethods';

let tester: NodeTester;

describe('Tests for AuthenticaGetShippingMethods', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await initAuthenticaTest();
    });

    afterAll(async () => {
        await container.get(Redis).close();
    });

    it('process - ok', async () => {
        await tester.testConnector(AUTHENTICA_GET_SHIPPING_METHODS);
    });
});
