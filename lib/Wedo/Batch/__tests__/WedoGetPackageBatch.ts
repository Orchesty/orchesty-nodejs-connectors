import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { wedoApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as WEDO_GET_PACKAGE_BATCH } from '../WedoGetPackageBatch';

let tester: NodeTester;

describe('Tests for WedoGetPackageConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await wedoApp();
    });

    it('process - ok', async () => {
        await tester.testBatch(WEDO_GET_PACKAGE_BATCH);
    });
});
