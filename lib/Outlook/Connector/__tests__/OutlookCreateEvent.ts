import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init, { mock } from '../../../../test/Implementation/outlook';
import { container } from '../../../../test/TestAbstract';
import { NAME as OUTLOOK_CREATE_EVENT } from '../OutlookCreateEvent';

let tester: NodeTester;

describe('Tests for OutlookCreateEvent', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        mock();
        await tester.testConnector(OUTLOOK_CREATE_EVENT);
    });
});
