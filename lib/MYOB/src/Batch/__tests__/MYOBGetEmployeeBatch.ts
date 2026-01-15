import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as MYOB_GET_EMPLOYEE_BATCH } from '../MYOBGetEmployeeBatch';

let tester: NodeTester;

describe('Tests for MYOBGetEmployeeBatch', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(MYOB_GET_EMPLOYEE_BATCH);
    });
});
