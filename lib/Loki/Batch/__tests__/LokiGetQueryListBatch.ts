import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/loki';
import { container } from '../../../../test/TestAbstract';
import { NAME as LOKI_GET_QUERY_LIST_BATCH } from '../LokiGetQueryListBatch';

let tester: NodeTester;

describe('Tests for LokiGetQueryListBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(LOKI_GET_QUERY_LIST_BATCH);
    });
});
