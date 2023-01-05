import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/vyfakturuj';
import { container } from '../../../../test/TestAbstract';
import { NAME as VYFAKTURUJ_CREATE_CONTACT_CONNECTOR } from '../VyfakturujCreateContactConnector';

let tester: NodeTester;

describe('Tests for VyfakturujCreateContactConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(VYFAKTURUJ_CREATE_CONTACT_CONNECTOR);
    });
});
