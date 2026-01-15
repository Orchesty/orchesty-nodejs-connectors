import {
    appInstall,
    DEFAULT_ACCESS_TOKEN,
    DEFAULT_CLIENT_ID,
    DEFAULT_CLIENT_SECRET,
    DEFAULT_USER,
} from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, oauth2Provider } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import AllegroApplication, { ENVIRONMENT, NAME as ALLEGRO_APP } from '../src/AllegroApplication';
import AllegroGetAvailableProductsBatch from '../src/Batch/AllegroGetAvailableProductsBatch';
import AllegroGetUsersOrderListBatch from '../src/Batch/AllegroGetUsersOrderListBatch';
import AllegroCreateDraftOfferConnector from '../src/Connector/AllegroCreateDraftOfferConnector';
import AllegroGetOrderDetailConnector from '../src/Connector/AllegroGetOrderDetailConnector';
import AllegroGetProductDetailConnector from '../src/Connector/AllegroGetProductDetailConnector';
import AllegroProposeProductConnector from '../src/Connector/AllegroProposeProductConnector';

export default function init(): void {
    appInstall(ALLEGRO_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [ENVIRONMENT]: 'test_environment',
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });

    const app = new AllegroApplication(oauth2Provider);
    container.setApplication(app);

    container.setNode(new AllegroGetProductDetailConnector(), app);
    container.setNode(new AllegroProposeProductConnector(), app);
    container.setNode(new AllegroGetOrderDetailConnector(), app);
    container.setNode(new AllegroGetUsersOrderListBatch(), app);
    container.setNode(new AllegroGetAvailableProductsBatch(), app);
    container.setNode(new AllegroCreateDraftOfferConnector(), app);
}
