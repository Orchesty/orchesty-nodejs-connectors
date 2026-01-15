import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as MERGADO_LIST_APPS_BATCH } from '../MergadoListAppsBatch';

let tester: NodeTester;

describe('Tests for MergadoListAppsBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(MERGADO_LIST_APPS_BATCH);
    });
});
