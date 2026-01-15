import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as CUSTOMER_IO_ADD_CUSTOMER } from '../CustomerIoAddCustomer';

let tester: NodeTester;

describe('Tests for CustomerIoAddCustomer', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(CUSTOMER_IO_ADD_CUSTOMER);
    });
});
