import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as MARKETO_CREATE_EMAIL_CONNECTOR } from '../MarketoCreateEmailConnector';

let tester: NodeTester;

describe('Tests for MarketoCreateEmailConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MARKETO_CREATE_EMAIL_CONNECTOR);
    });
});
