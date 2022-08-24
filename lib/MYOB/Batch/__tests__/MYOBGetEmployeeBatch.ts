import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/myob';
import { container } from '../../../../test/TestAbstract';
import { NAME as MYOB_GET_EMPLOYEE_BATCH } from '../MYOBGetEmployeeBatch';

let tester: NodeTester;

describe('Tests for MYOBGetEmployeeBatch', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testBatch(MYOB_GET_EMPLOYEE_BATCH);
    });
});
