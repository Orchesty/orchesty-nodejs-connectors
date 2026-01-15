import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../test/dataProvider';
import { NAME as JAMES_AND_JAMES_CREATE_ASN } from '../JamesAndJamesCreateASN';

let tester: NodeTester;

describe('Tests for JamesAndJamesCreateASN', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        await tester.testConnector(JAMES_AND_JAMES_CREATE_ASN);
    });
});
