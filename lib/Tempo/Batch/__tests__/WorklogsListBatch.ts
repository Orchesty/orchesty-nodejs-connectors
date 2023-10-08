import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/tempo';
import { container } from '../../../../test/TestAbstract';
import { NAME } from '../WorklogsListBatch';

let tester: NodeTester;

describe('Tests for WorklogsListBatch', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        await tester.testBatch(NAME);
    });
});
