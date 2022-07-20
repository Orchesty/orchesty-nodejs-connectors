import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { NAME as ALLEGRO_PROPOSE_PRODUCT_CONNECTOR } from '../AllegroProposeProductConnector';
import { allegroApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';

let tester: NodeTester;

describe('Tests for AllegroProposeProductConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await allegroApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(ALLEGRO_PROPOSE_PRODUCT_CONNECTOR);
  });
});
