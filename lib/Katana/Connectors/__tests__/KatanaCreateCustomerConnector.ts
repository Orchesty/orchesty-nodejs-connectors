import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { katanaApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as KATANA_CREATE_CUSTOMER_CONNECTOR } from '../KatanaCreateCustomerConnector';

let tester: NodeTester;

describe('Tests for KatanaCreateCustomerConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await katanaApp();
    });

    it('process - ok', async () => {
        await tester.testConnector(KATANA_CREATE_CUSTOMER_CONNECTOR);
    });
});
