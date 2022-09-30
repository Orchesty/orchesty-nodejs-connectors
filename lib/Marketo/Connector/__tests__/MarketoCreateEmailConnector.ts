import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/marketo';
import { container } from '../../../../test/TestAbstract';
import { NAME as MARKETO_CREATE_EMAIL_CONNECTOR } from '../MarketoCreateEmailConnector';

let tester: NodeTester;

describe('Tests for MarketoCreateEmailConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MARKETO_CREATE_EMAIL_CONNECTOR);
    });
});
