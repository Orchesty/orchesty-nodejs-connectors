import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/upgates';
import { container } from '../../../../test/TestAbstract';
import { NAME as UPGATES_GET_SHIPMENTS } from '../UpgatesGetShipments';

let tester: NodeTester;

describe('Tests for UpgatesGetShipments', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        mock();
        await tester.testConnector(UPGATES_GET_SHIPMENTS);
    });
});
