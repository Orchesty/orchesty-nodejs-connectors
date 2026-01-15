import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as TWITTER_POST_A_TWEET_CONNECTOR } from '../TwitterPostATweetConnector';

let tester: NodeTester;

describe('Tests for TwitterPostATweetConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(TWITTER_POST_A_TWEET_CONNECTOR);
    });
});
