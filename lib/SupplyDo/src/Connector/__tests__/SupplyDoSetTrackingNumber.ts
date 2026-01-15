import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../test/dataProvider';
import { NAME as SUPPLY_DO_SET_TRACKING_NUMBER } from '../SupplyDoSetTrackingNumber';

let tester: NodeTester;

describe('Tests for SupplyDoSetTrackingNumber', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
        mock();
    });

    it('process - ok', async () => {
        await tester.testConnector(SUPPLY_DO_SET_TRACKING_NUMBER);
    });
});
