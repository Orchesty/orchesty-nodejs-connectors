import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as ALLEGRO_PROPOSE_PRODUCT_CONNECTOR } from '../AllegroProposeProductConnector';

let tester: NodeTester;

describe('Tests for AllegroProposeProductConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ALLEGRO_PROPOSE_PRODUCT_CONNECTOR);
    });
});
