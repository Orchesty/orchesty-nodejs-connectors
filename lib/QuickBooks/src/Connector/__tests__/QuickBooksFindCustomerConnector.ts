import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as QUICK_BOOKS_FIND_CUSTOMER_CONNECTOR } from '../QuickBooksFindCustomerConnector';

let tester: NodeTester;

describe('Tests for QuickBooksFindCustomerConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(QUICK_BOOKS_FIND_CUSTOMER_CONNECTOR);
    });
});
