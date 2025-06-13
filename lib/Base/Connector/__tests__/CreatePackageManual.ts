import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/base';
import { container } from '../../../../test/TestAbstract';
import { NAME as CREATE_PACKAGE_MANUAL } from '../CreatePackageManual';

let tester: NodeTester;

describe('Tests for CreatePackageManual', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(CREATE_PACKAGE_MANUAL);
    });
});
