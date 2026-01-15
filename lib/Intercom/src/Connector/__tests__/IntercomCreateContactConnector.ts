import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as INTERCOM_CREATE_CONTACT_CONNECTOR } from '../IntercomCreateContactConnector';

let tester: NodeTester;

describe('Tests for IntercomCreateContactConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(INTERCOM_CREATE_CONTACT_CONNECTOR);
    });
});
