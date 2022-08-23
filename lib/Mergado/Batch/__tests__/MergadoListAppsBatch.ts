import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { NAME as MERGADO_LIST_APPS_BATCH } from '../MergadoListAppsBatch';
import { container } from '../../../../test/TestAbstract';
import init from '../../../../test/Implementation/mergado';

let tester: NodeTester;

describe('Tests for MergadoListAppsBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await init();
  });

  it('process - ok', async () => {
    await tester.testBatch(MERGADO_LIST_APPS_BATCH);
  });
});
