import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/base';
import { container } from '../../../../test/TestAbstract';
import { NAME as ORDER_EXTRA_FIELDS } from '../OrderExtraFields';

let tester: NodeTester;

describe('Tests for OrderExtraFields', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(ORDER_EXTRA_FIELDS);
    });
});
