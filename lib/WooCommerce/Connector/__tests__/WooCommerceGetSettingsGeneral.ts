import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/woocommerce';
import { container } from '../../../../test/TestAbstract';
import { NAME as WOO_COMMERCE_GET_SETTINGS_GENERAL } from '../WooCommerceGetSettingsGeneral';

let tester: NodeTester;

describe('Tests for WooCommerceGetSettingsGeneral', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    beforeEach(() => {
        mock();
    });

    it('process - ok', async () => {
        await tester.testConnector(WOO_COMMERCE_GET_SETTINGS_GENERAL);
    });

    it('process - with id', async () => {
        await tester.testConnector(WOO_COMMERCE_GET_SETTINGS_GENERAL, 'with-id');
    });
});
