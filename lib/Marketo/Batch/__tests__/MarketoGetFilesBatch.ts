import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as MARKETO_GET_FILES_BATCH } from '../MarketoGetFilesBatch';
import init from '../../../../test/Implementation/marketo';

let tester: NodeTester;

describe('Tests for MarketoGetFilesBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await init();
  });

  it('process - ok', async () => {
    await tester.testBatch(MARKETO_GET_FILES_BATCH);
  });
});
