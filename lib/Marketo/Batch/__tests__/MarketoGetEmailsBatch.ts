import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as MARKETO_GET_EMAILS_BATCH } from '../MarketoGetEmailsBatch';
import { marketoApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for MarketoGetEmailsBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await marketoApp();
  });

  it('process - ok', async () => {
    await tester.testBatch(MARKETO_GET_EMAILS_BATCH);
  });
});
