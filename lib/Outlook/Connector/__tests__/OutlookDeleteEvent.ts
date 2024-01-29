import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/outlook';
import { container } from '../../../../test/TestAbstract';
import { NAME as OUTLOOK_DELETE_EVENT } from '../OutlookDeleteEvent';

let tester: NodeTester;

describe('Tests for OutlookDeleteEvent', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(OUTLOOK_DELETE_EVENT);
    });
});
