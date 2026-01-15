import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as ONESIGNAL_CREATE_APP_CONNECTOR } from '../OnesignalCreateAppConnector';

let tester: NodeTester;

describe('Tests for OnesignalCreateAppConnector', () => {
    beforeEach(() => {
        init();
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        await tester.testConnector(ONESIGNAL_CREATE_APP_CONNECTOR);
    });
});
