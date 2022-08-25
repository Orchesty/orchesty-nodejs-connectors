import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { twitterApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as TWITTER_POST_A_TWEET_CONNECTOR } from '../TwitterPostATweetConnector';

let tester: NodeTester;

describe('Tests for TwitterPostATweetConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await twitterApp();
    });

    it('process - ok', async () => {
        await tester.testConnector(TWITTER_POST_A_TWEET_CONNECTOR);
    });
});
