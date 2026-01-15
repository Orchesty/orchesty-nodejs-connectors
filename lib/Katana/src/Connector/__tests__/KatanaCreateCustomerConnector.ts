import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as KATANA_CREATE_CUSTOMER_CONNECTOR } from '../KatanaCreateCustomerConnector';

let tester: NodeTester;

describe('Tests for KatanaCreateCustomerConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(KATANA_CREATE_CUSTOMER_CONNECTOR);
    });
});
