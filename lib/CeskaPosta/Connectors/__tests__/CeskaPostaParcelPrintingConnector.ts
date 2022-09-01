import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/ceskaPosta';
import { container } from '../../../../test/TestAbstract';
import { NAME as CESKA_POSTA_PARCEL_PRINTING_CONNECTOR } from '../CeskaPostaParcelPrintingConnector';

let tester: NodeTester;

describe('Tests for CeskaPostaParcelPrintingConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(CESKA_POSTA_PARCEL_PRINTING_CONNECTOR);
    });
});
