import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import AllegroApplication, { ENVIRONMENT, NAME as ALLEGRO_APP } from '../../lib/Allegro/AllegroApplication';
import AllegroGetAvailableProductsBatch from '../../lib/Allegro/Batch/AllegroGetAvailableProductsBatch';
import AllegroGetUsersOrderListBatch from '../../lib/Allegro/Batch/AllegroGetUsersOrderListBatch';
import AllegroCreateDraftOfferConnector from '../../lib/Allegro/Connector/AllegroCreateDraftOfferConnector';
import AllegroGetOrderDetailConnector from '../../lib/Allegro/Connector/AllegroGetOrderDetailConnector';
import AllegroGetProductDetailConnector from '../../lib/Allegro/Connector/AllegroGetProductDetailConnector';
import AllegroProposeProductConnector from '../../lib/Allegro/Connector/AllegroProposeProductConnector';
import {
    appInstall,
    DEFAULT_ACCESS_TOKEN,
    DEFAULT_CLIENT_ID,
    DEFAULT_CLIENT_SECRET,
    DEFAULT_USER,
} from '../DataProvider';
import {
    container, db, oauth2Provider, sender,
} from '../TestAbstract';

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

    const getProductDetail = new AllegroGetProductDetailConnector();
    const proposeProduct = new AllegroProposeProductConnector();
    const getOrderDetail = new AllegroGetOrderDetailConnector();
    const getUsersOrderList = new AllegroGetUsersOrderListBatch();
    const getAvailableProducts = new AllegroGetAvailableProductsBatch();
    const createDraftOffer = new AllegroCreateDraftOfferConnector();

    getProductDetail
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getProductDetail);
    proposeProduct
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(proposeProduct);
    getOrderDetail
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getOrderDetail);
    getUsersOrderList
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getUsersOrderList);
    getAvailableProducts
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getAvailableProducts);
    createDraftOffer
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createDraftOffer);
}
