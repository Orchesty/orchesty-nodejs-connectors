import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/base';
import { container } from '../../../../test/TestAbstract';
import { NAME as JOURNAL_LIST } from '../JournalList';

let tester: NodeTester;

describe('Tests for JournalList', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(JOURNAL_LIST);
    });
});
