import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { merkApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as MERK_SUGGEST_CONNECTOR } from '../MerkSuggestConnector';

let tester: NodeTester;

describe('Tests for MerkSuggestConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await merkApp();
    });

    it('process - ok', async () => {
        await tester.testConnector(MERK_SUGGEST_CONNECTOR);
    });
});
