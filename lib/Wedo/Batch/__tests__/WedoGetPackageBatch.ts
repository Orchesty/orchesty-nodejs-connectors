import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/wedo';
import { container } from '../../../../test/TestAbstract';
import { NAME as WEDO_GET_PACKAGE_BATCH } from '../WedoGetPackageBatch';

let tester: NodeTester;

describe('Tests for WedoGetPackageConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(WEDO_GET_PACKAGE_BATCH);
    });
});
