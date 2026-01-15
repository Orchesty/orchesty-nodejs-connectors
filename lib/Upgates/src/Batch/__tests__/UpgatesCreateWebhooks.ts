import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init } from '../../../test/dataProvider';
import { NAME as UPGATES_CREATE_WEBHOOKS } from '../UpgatesCreateWebhooks';

let tester: NodeTester;

describe('Tests for UpgatesCreateWebhooks', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(UPGATES_CREATE_WEBHOOKS);
    });
});
