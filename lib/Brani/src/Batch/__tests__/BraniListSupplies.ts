import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as BRANI_LIST_SUPPLIES } from '../BraniListSupplies';

let tester: NodeTester;

describe('Tests for BraniListSupplies', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(BRANI_LIST_SUPPLIES);
    });
});
