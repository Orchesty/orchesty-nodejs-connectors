import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initAuthenticaTest } from '../../../test/dataProvider';
import { AUTHENTICA_GET_ORDER } from '../AuthenticaGetOrder';

let tester: NodeTester;

describe('Tests for AuthenticaGetOrder', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await initAuthenticaTest();
    });

    afterAll(async () => {
        await container.get(Redis).close();
    });

    it('process - ok', async () => {
        await tester.testConnector(AUTHENTICA_GET_ORDER);
    });
});
