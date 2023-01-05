import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/calendly';
import { container } from '../../../../test/TestAbstract';
import { NAME as CALENDLY_LIST_EVENTS_BATCH } from '../CalendlyListEventsBatch';

let tester: NodeTester;

describe('Tests for CalendlyListEventsBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(CALENDLY_LIST_EVENTS_BATCH);
    });
});
