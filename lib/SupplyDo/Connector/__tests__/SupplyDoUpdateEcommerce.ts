import { container } from '@orchesty/nodejs-sdk';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/supplyDo';
import { NAME as SUPPLY_DO_UPDATE_ECOMMERCE } from '../SupplyDoUpdateEcommerce';

let tester: NodeTester;

describe('Tests for SupplyDoUpdateEcommerce', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        await tester.testConnector(SUPPLY_DO_UPDATE_ECOMMERCE);
    });
});
