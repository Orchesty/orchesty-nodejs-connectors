import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/tableau';
import { container } from '../../../../test/TestAbstract';
import { NAME as TABLEAU_GET_CONNECTED_APP_CONNECTOR } from '../TableauGetConnectedAppConnector';

let tester: NodeTester;

describe('Tests for TableauGetConnectedAppConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        mock();
        await tester.testConnector(TABLEAU_GET_CONNECTED_APP_CONNECTOR);
    });
});
