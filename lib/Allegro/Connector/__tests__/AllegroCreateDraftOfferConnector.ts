import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/allegro';
import { NAME as ALLEGRO_CREATE_DRAFT_OFFER_CONNECTOR } from '../AllegroCreateDraftOfferConnector';
import { container } from '../../../../test/TestAbstract';

let tester: NodeTester;

describe('Tests for AllegroCreateDraftOfferConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await init();
  });

  it('process - ok', async () => {
    await tester.testConnector(ALLEGRO_CREATE_DRAFT_OFFER_CONNECTOR);
  });
});
