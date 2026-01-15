import {
    appInstall,
    DEFAULT_ACCESS_TOKEN,
    DEFAULT_CLIENT_ID,
    DEFAULT_CLIENT_SECRET,
    DEFAULT_USER,
} from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, oauth2Provider, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import TwitterGetFollowersBatch from '../src/Batch/TwitterGetFollowersBatch';
import TwitterDeleteTweetConnector from '../src/Connector/TwitterDeleteTweetConnector';
import TwitterPostATweetConnector from '../src/Connector/TwitterPostATweetConnector';
import TwitterApplication, { NAME as TWITTER_APP } from '../src/TwitterApplication';

export default function init(): void {
    appInstall(TWITTER_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
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
