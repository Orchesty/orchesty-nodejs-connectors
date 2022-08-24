import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/marketo';
import { container } from '../../../../test/TestAbstract';
import { NAME as MARKETO_GET_EMAILS_BATCH } from '../MarketoGetEmailsBatch';

let tester: NodeTester;

describe('Tests for MarketoGetEmailsBatch', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testBatch(MARKETO_GET_EMAILS_BATCH);
    });
});
