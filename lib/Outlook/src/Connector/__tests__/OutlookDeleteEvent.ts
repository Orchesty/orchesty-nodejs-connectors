import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init, { mock } from '../../../test/dataProvider';
import { NAME as OUTLOOK_DELETE_EVENT } from '../OutlookDeleteEvent';

let tester: NodeTester;

describe('Tests for OutlookDeleteEvent', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        mock();
        await tester.testConnector(OUTLOOK_DELETE_EVENT);
    });
});
