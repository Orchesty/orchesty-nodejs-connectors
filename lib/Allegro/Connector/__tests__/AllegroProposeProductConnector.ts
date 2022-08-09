import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/allegro';
import { NAME as ALLEGRO_PROPOSE_PRODUCT_CONNECTOR } from '../AllegroProposeProductConnector';
import { container } from '../../../../test/TestAbstract';

let tester: NodeTester;

describe('Tests for AllegroProposeProductConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await init();
  });

  it('process - ok', async () => {
    await tester.testConnector(ALLEGRO_PROPOSE_PRODUCT_CONNECTOR);
  });
});
