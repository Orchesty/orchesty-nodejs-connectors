import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { NAME as MERGADO_LIST_APPS_BATCH } from '../MergadoListAppsBatch';
import { mergadoApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';

let tester: NodeTester;

describe('Tests for MergadoListAppsBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await mergadoApp();
  });

  it('process - ok', async () => {
    await tester.testBatch(MERGADO_LIST_APPS_BATCH);
  });
});
