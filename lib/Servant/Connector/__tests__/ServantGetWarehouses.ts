import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init } from '../../../../test/Implementation/servant';
import { container } from '../../../../test/TestAbstract';
import { NAME as GET_WAREHOUSES } from '../ServantGetWarehouses';

let tester: NodeTester;

describe('Tests for SendiblueCreateCampaignConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(GET_WAREHOUSES);
    });
});
