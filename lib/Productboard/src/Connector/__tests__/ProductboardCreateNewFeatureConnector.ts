import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as PRODUCTBOARD_CREATE_NEW_FEATURE_CONNECTOR } from '../ProductboardCreateNewFeatureConnector';

let tester: NodeTester;

describe('Tests for ProductboardCreateNewFeatureConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(PRODUCTBOARD_CREATE_NEW_FEATURE_CONNECTOR);
    });
});
