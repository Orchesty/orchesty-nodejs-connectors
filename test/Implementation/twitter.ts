import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import TwitterGetFollowersBatch from '../../lib/Twitter/Batch/TwitterGetFollowersBatch';
import TwitterDeleteTweetConnector from '../../lib/Twitter/Connector/TwitterDeleteTweetConnector';
import TwitterPostATweetConnector from '../../lib/Twitter/Connector/TwitterPostATweetConnector';
import TwitterApplication, { NAME as TWITTER_APP } from '../../lib/Twitter/TwitterApplication';
import {
    appInstall,
    DEFAULT_ACCESS_TOKEN,
    DEFAULT_CLIENT_ID,
    DEFAULT_CLIENT_SECRET,
    DEFAULT_USER,
} from '../DataProvider';
import { container, db, oauth2Provider, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(TWITTER_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });

    const app = new TwitterApplication(oauth2Provider);
    container.setApplication(app);

    const postATweet = new TwitterPostATweetConnector();
    const deleteTweet = new TwitterDeleteTweetConnector();
    const getFollowers = new TwitterGetFollowersBatch();

    postATweet
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(postATweet);
    deleteTweet
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(deleteTweet);
    getFollowers
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getFollowers);
}
