import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../test/dataProvider';
import { NAME as TABLEAU_CREATE_CONNECTED_APP_CONNECTOR } from '../TableauCreateConnectedAppConnector';

let tester: NodeTester;

describe('Tests for TableauCreateConnectedAppConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    beforeEach(() => {
        mock();
    });

    it('process - ok', async () => {
        await tester.testConnector(TABLEAU_CREATE_CONNECTED_APP_CONNECTOR);
    });
});
