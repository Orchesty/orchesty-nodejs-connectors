import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/intercom';
import { container } from '../../../../test/TestAbstract';
import { NAME as INTERCOM_CREATE_CONTACT_CONNECTOR } from '../IntercomCreateContactConnector';

let tester: NodeTester;

describe('Tests for IntercomCreateContactConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(INTERCOM_CREATE_CONTACT_CONNECTOR);
    });
});
