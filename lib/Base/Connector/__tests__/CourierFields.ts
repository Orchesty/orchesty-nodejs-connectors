import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/base';
import { container } from '../../../../test/TestAbstract';
import { NAME as COURIER_FIELDS } from '../CourierFields';

let tester: NodeTester;

describe('Tests for CourierFields', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(COURIER_FIELDS);
    });
});
