import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/ceskaPosta';
import { container } from '../../../../test/TestAbstract';
import { NAME as CESKA_POSTA_PARCEL_STATUS_CONNECTOR } from '../CeskaPostaParcelStatusConnector';

let tester: NodeTester;

describe('Tests for CeskaPostaParcelStatusConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(CESKA_POSTA_PARCEL_STATUS_CONNECTOR);
    });
});
