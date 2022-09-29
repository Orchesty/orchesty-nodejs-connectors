import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/ceskaPosta';
import { container } from '../../../../test/TestAbstract';
import { NAME as CESKA_POSTA_GET_SEND_PARCELS_CONNECTOR } from '../CeskaPostaGetSendParcelsConnector';

let tester: NodeTester;

describe('Tests for CeskaPostaGetSendParcelsConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(CESKA_POSTA_GET_SEND_PARCELS_CONNECTOR);
    });
});
