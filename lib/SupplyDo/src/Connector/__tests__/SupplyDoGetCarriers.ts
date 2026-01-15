import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../test/dataProvider';
import { NAME as SUPPLY_DO_GET_CARRIERS } from '../SupplyDoGetCarriers';

let tester: NodeTester;

describe('Tests for SupplyDoGetCarriers', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        await tester.testConnector(SUPPLY_DO_GET_CARRIERS);
    });
});
