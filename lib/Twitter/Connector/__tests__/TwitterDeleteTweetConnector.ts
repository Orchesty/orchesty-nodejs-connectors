import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { twitterApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as TWITTER_DELETE_TWEET_CONNECTOR } from '../TwitterDeleteTweetConnector';

let tester: NodeTester;

describe('Tests for TwitterDeleteTweetConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await twitterApp();
    });

    it('process - ok', async () => {
        await tester.testConnector(TWITTER_DELETE_TWEET_CONNECTOR);
    });
});
