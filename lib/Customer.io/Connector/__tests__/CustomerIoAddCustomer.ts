import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/customerIo';
import { container } from '../../../../test/TestAbstract';
import { NAME as CUSTOMER_IO_ADD_CUSTOMER } from '../CustomerIoAddCustomer';

let tester: NodeTester;

describe('Tests for CustomerIoAddCustomer', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(CUSTOMER_IO_ADD_CUSTOMER);
    });
});
