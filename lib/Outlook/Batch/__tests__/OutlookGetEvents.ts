import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/outlook';
import { container } from '../../../../test/TestAbstract';
import { NAME as OUTLOOK_GET_EVENTS } from '../OutlookGetEvents';

let tester: NodeTester;

describe('Tests for OutlookGetEvents', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(OUTLOOK_GET_EVENTS);
    });
});
