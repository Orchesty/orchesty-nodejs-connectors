import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/jamesAndJames';
import { container } from '../../../../test/TestAbstract';
import { NAME as JAMES_AND_JAMES_UPDATE_ASN } from '../JamesAndJamesUpdateASN';

let tester: NodeTester;

describe('Tests for JamesAndJamesUpdateASN', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        await tester.testConnector(JAMES_AND_JAMES_UPDATE_ASN);
    });
});
