import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as ALLEGRO_CREATE_DRAFT_OFFER_CONNECTOR } from '../AllegroCreateDraftOfferConnector';

let tester: NodeTester;

describe('Tests for AllegroCreateDraftOfferConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ALLEGRO_CREATE_DRAFT_OFFER_CONNECTOR);
    });
});
