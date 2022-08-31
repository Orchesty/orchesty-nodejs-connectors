import { container as c, initiateContainer } from '@orchesty/nodejs-sdk';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import CacheService from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import DIContainer from '@orchesty/nodejs-sdk/dist/lib/DIContainer/Container';
import CoreServices from '@orchesty/nodejs-sdk/dist/lib/DIContainer/CoreServices';
import Metrics from '@orchesty/nodejs-sdk/dist/lib/Metrics/Metrics';
import MongoDbClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Mongodb/Client';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import CeskaPostaApplication from '../lib/CeskaPosta/CeskaPostaApplication';
import CeskaPostaGetSendParcelsConnector from '../lib/CeskaPosta/Connectors/CeskaPostaGetSendParcelsConnector';
import CeskaPostaParcelPrintingConnector from '../lib/CeskaPosta/Connectors/CeskaPostaParcelPrintingConnector';
import CeskaPostaParcelStatusConnector from '../lib/CeskaPosta/Connectors/CeskaPostaParcelStatusConnector';
import ClickupApplication from '../lib/Clickup/ClickupApplication';
import ClickupCreateSpaceConnector from '../lib/Clickup/Connectors/ClickupCreateSpaceConnector';
import ClickupCreateTaskConnector from '../lib/Clickup/Connectors/ClickupCreateTaskConnector';
import ClickupGetUserConnector from '../lib/Clickup/Connectors/ClickupGetUserConnector';
import FakturaonlineCreateNewInvoiceConnector
    from '../lib/Fakturaonline/Connector/FakturaonlineCreateNewInvoiceConnector';
import FakturaonlineGetInvoiceConnector from '../lib/Fakturaonline/Connector/FakturaonlineGetInvoiceConnector';
import FakturaonlineUpdateInvoiceConnector from '../lib/Fakturaonline/Connector/FakturaonlineUpdateInvoiceConnector';
import FakturaonlineApplication from '../lib/Fakturaonline/FakturaonlineApplication';
import GitHubGeRespositoriesBatch from '../lib/GitHub/Batch/GitHubRepositoriesBatch';
import GitHubGetAppConnector from '../lib/GitHub/Connector/GitHubGetAppConnector';
import GitHubGetRepositoryConnector from '../lib/GitHub/Connector/GitHubGetRepositoryConnector';
import GitHubApplication from '../lib/GitHub/GitHubApplication';
import GObalikCreateOrderConnector from '../lib/GObalik/Connectors/GObalikCreateOrderConnector';
import GObalikOrderDetailConnector from '../lib/GObalik/Connectors/GObalikOrderDetailConnector';
import GObalikOrderListConnector from '../lib/GObalik/Connectors/GObalikOrderListConnector';
import GObalikApplication from '../lib/GObalik/GObalikApplication';
import GreenHouseListAppBatch from '../lib/GreenHouse/Batch/GreenHouseListAppBatch';
import GreenHouseListCandidatesBatch from '../lib/GreenHouse/Batch/GreenHouseListCandidatesBatch';
import GreenHouseAddCandidateConnector from '../lib/GreenHouse/connector/GreenHouseAddCandidateConnector';
import GreenHouseApplication from '../lib/GreenHouse/GreenHouseApplication';
import IntercomListAllContactsBatch from '../lib/Intercom/Batch/IntercomListAllContactsBatch';
import IntercomCreateContactConnector from '../lib/Intercom/Connector/IntercomCreateContactConnector';
import IntercomApplication from '../lib/Intercom/IntercomApplication';
import KatanaListProductsBatch from '../lib/Katana/Batch/KatanaListProductsBatch';
import KatanaCreateCustomerConnector from '../lib/Katana/Connectors/KatanaCreateCustomerConnector';
import KatanaCreateProductConnector from '../lib/Katana/Connectors/KatanaCreateProductConnector';
import KatanaApplication from '../lib/Katana/KatanaApplication';
import MallGetOrderListBatch from '../lib/Mall/Batch/MallGetOrderListBatch';
import MallGetProductListBatch from '../lib/Mall/Batch/MallGetProductListBatch';
import MallGetOrderDetailConnector from '../lib/Mall/Connector/MallGetOrderDetailConnector';
import MallGetProductDetailConnector from '../lib/Mall/Connector/MallGetProductDetailConnector';
import MallPostProductConnector from '../lib/Mall/Connector/MallPostProductConnector';
import MallPutOrdersConnector from '../lib/Mall/Connector/MallPutOrdersConnector';
import MallPutProductConnector from '../lib/Mall/Connector/MallPutProductConnector';
import MallApplication from '../lib/Mall/MallApplication';
import MerkGetCompanyConnector from '../lib/Merk/Connector/MerkGetCompanyConnector';
import MerkSuggestConnector from '../lib/Merk/Connector/MerkSuggestConnector';
import MerkApplication from '../lib/Merk/MerkApplication';
import NutshellGetAccountConnector from '../lib/Nutshell/Connector/NutshellGetAccountConnector';
import NutshellNewAccountConnector from '../lib/Nutshell/Connector/NutshellNewAccountConnector';
import NutshellNewLeadConnector from '../lib/Nutshell/Connector/NutshellNewLeadConnector';
import NutshellNewTaskConnector from '../lib/Nutshell/Connector/NutshellNewTaskConnector';
import NutshellApplication from '../lib/Nutshell/NutshellApplication';
import OnesignalViewAppsBatch from '../lib/Onesignal/Batch/OnesignalViewAppsBatch';
import OnesignalCreateAppConnector from '../lib/Onesignal/Connectors/OnesignalCreateAppConnector';
import OnesignalApplication from '../lib/Onesignal/OnesignalApplication';
import PaypalCreateOrderConnector from '../lib/Paypal/Connector/PaypalCreateOrderConnector';
import PaypalCreatePayoutConnector from '../lib/Paypal/Connector/PaypalCreatePayoutConnector';
import PaypalCreateProductConnector from '../lib/Paypal/Connector/PaypalCreateProductConnector';
import PaypalApplication from '../lib/Paypal/PaypalApplication';
import PipedriveGetAllLeadsBatch from '../lib/Pipedrive/Batch/PipedriveGetAllLeadsBatch';
import PipedriveAddLeadConnector from '../lib/Pipedrive/Connector/PipedriveAddLeadConnector';
import PipedriveUpdateLeadConnector from '../lib/Pipedrive/Connector/PipedriveUpdateLeadConnector';
import PipedriveApplication from '../lib/Pipedrive/PipedriveApplication';
import TableauCreateConnectedAppConnector from '../lib/Tableau/Connector/TableauCreateConnectedAppConnector';
import TableauGetConnectedAppConnector from '../lib/Tableau/Connector/TableauGetConnectedAppConnector';
import TableauApplication from '../lib/Tableau/TableauApplication';
import TwitterGetFollowersBatch from '../lib/Twitter/Batch/TwitterGetFollowersBatch';
import TwitterDeleteTweetConnector from '../lib/Twitter/Connector/TwitterDeleteTweetConnector';
import TwitterPostATweetConnector from '../lib/Twitter/Connector/TwitterPostATweetConnector';
import TwitterApplication from '../lib/Twitter/TwitterApplication';
import VyfakturujCreateContactConnector from '../lib/Vyfakturuj/Connector/VyfakturujCreateContactConnector';
import VyfakturujCreateInvoiceConnector from '../lib/Vyfakturuj/Connector/VyfakturujCreateInvoiceConnector';
import VyfakturujApplication from '../lib/Vyfakturuj/VyfakturujApplication';
import WedoGetPackageBatch from '../lib/Wedo/Batch/WedoGetPackageBatch';
import WedoApplication from '../lib/Wedo/WedoApplication';
import WixCreateOrderConnector from '../lib/Wix/Connector/WixCreateOrderConnector';
import WixCreateProductConnector from '../lib/Wix/Connector/WixCreateProductConnector';
import WixGetOrderConnector from '../lib/Wix/Connector/WixGetOrderConnector';
import WixUpdateProductConnector from '../lib/Wix/Connector/WixUpdateProductConnector';
import WixApplication from '../lib/Wix/WixApplication';
/* eslint-disable @typescript-eslint/no-use-before-define */

/* eslint-disable import/no-mutable-exports */
export let container: DIContainer;
export let db: MongoDbClient;
export let sender: CurlSender;
export let oauth2Provider: OAuth2Provider;
export let redis: Redis;
export let cacheService: CacheService;
/* eslint-enable import/no-mutable-exports */

let initiated = false;

export async function prepare(): Promise<void> {
    if (initiated) {
        return;
    }

    await initiateContainer();
    container = c;
    db = container.get(CoreServices.MONGO);
    sender = container.get(CoreServices.CURL);
    oauth2Provider = container.get(CoreServices.OAUTH2_PROVIDER);

    redis = new Redis(process.env.REDIS_DSN ?? '');
    container.set(CoreServices.REDIS, redis);

    cacheService = new CacheService(redis, sender);
    container.set(CoreServices.CACHE, cacheService);

    await dropCollection(ApplicationInstall.getCollection());

    initCeskaPosta();
    initClickup();
    initFakturaonline();
    initGObalik();
    initGitHub();
    initGreenHouse();
    initIntercom();
    initKatanaApp();
    initMall();
    initMerk();
    initNutshell();
    initPaypal();
    initPipedrive();
    initTableau();
    initTwitter();
    initVyfakturuj();
    initWedo();
    initWix();
    initOnesignal();

    initiated = true;
}

export async function closeConnection(): Promise<void> {
    await db.down();
    await container.get<Metrics>(CoreServices.METRICS).close();
    await container.get<Redis>(CoreServices.REDIS).close();
}

export async function dropCollection(collection: string): Promise<void> {
    const database = await db.db();
    try {
        await database.dropCollection(collection);
    } catch {
    // ...
    }
}

function initPipedrive(): void {
    const app = new PipedriveApplication();
    const getAllLeads = new PipedriveGetAllLeadsBatch();
    const addLead = new PipedriveAddLeadConnector();
    const updateLead = new PipedriveUpdateLeadConnector();
    container.setApplication(app);

    getAllLeads
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getAllLeads);
    addLead
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(addLead);
    updateLead
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(updateLead);
}

function initNutshell(): void {
    const app = new NutshellApplication();
    container.setApplication(app);

    const getAccount = new NutshellGetAccountConnector();
    const newAccount = new NutshellNewAccountConnector();
    const newLead = new NutshellNewLeadConnector();
    const newTask = new NutshellNewTaskConnector();

    getAccount
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getAccount);

    newAccount
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(newAccount);

    newLead
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(newLead);

    newTask
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(newTask);
}

function initMall(): void {
    const app = new MallApplication();
    container.setApplication(app);

    const getProductList = new MallGetProductListBatch();
    const getOrdersList = new MallGetOrderListBatch();
    const postProduct = new MallPostProductConnector();
    const getProductDetail = new MallGetProductDetailConnector();
    const getOrderDetail = new MallGetOrderDetailConnector();
    const putProduct = new MallPutProductConnector();
    const putOrder = new MallPutOrdersConnector();

    getProductList
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getProductList);

    getOrdersList
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getOrdersList);

    postProduct
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(postProduct);

    getProductDetail
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getProductDetail);

    getOrderDetail
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getOrderDetail);

    putProduct
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(putProduct);

    putOrder
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(putOrder);
}

function initTableau(): void {
    const tableauApp = new TableauApplication(sender, db);
    const tableauGetConnectedAppConnector = new TableauGetConnectedAppConnector();
    const tableauCreateConnectedAppConnector = new TableauCreateConnectedAppConnector();

    container.setApplication(tableauApp);

    tableauGetConnectedAppConnector
        .setSender(sender)
        .setDb(db)
        .setApplication(tableauApp);
    container.setConnector(tableauGetConnectedAppConnector);

    tableauCreateConnectedAppConnector
        .setSender(sender)
        .setDb(db)
        .setApplication(tableauApp);
    container.setConnector(tableauCreateConnectedAppConnector);
}

function initWix(): void {
    const app = new WixApplication(oauth2Provider);
    container.setApplication(app);

    const createOrder = new WixCreateOrderConnector();
    const createProduct = new WixCreateProductConnector();
    const getOrder = new WixGetOrderConnector();
    const updateProduct = new WixUpdateProductConnector();

    createOrder
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createOrder);

    createProduct
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createProduct);

    getOrder
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getOrder);

    updateProduct
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(updateProduct);
}

function initFakturaonline(): void {
    const app = new FakturaonlineApplication();
    const createNewInvoice = new FakturaonlineCreateNewInvoiceConnector();
    const createGetInvoice = new FakturaonlineGetInvoiceConnector();
    const updateInvoice = new FakturaonlineUpdateInvoiceConnector();
    container.setApplication(app);

    createNewInvoice
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createNewInvoice);

    createGetInvoice
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createGetInvoice);

    updateInvoice
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(updateInvoice);
}

function initVyfakturuj(): void {
    const app = new VyfakturujApplication();
    container.setApplication(app);

    const createInvoice = new VyfakturujCreateInvoiceConnector();
    const createContact = new VyfakturujCreateContactConnector();

    createInvoice
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createInvoice);

    createContact
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createContact);
}

function initWedo(): void {
    const app = new WedoApplication();
    container.setApplication(app);

    const getPackage = new WedoGetPackageBatch();

    getPackage
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getPackage);
}

function initGitHub(): void {
    const app = new GitHubApplication();
    container.setApplication(app);

    const getApp = new GitHubGetAppConnector();
    const getRepositories = new GitHubGeRespositoriesBatch();
    const getRepository = new GitHubGetRepositoryConnector();

    getApp
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getApp);

    getRepositories
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getRepositories);
    getRepository
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getRepository);
}

function initPaypal(): void {
    const app = new PaypalApplication(sender);
    container.setApplication(app);

    const createProduct = new PaypalCreateProductConnector();
    const createOrder = new PaypalCreateOrderConnector();
    const createPayout = new PaypalCreatePayoutConnector();

    createProduct
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createProduct);
    createOrder
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createOrder);
    createPayout
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createPayout);
}

function initTwitter(): void {
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

function initGObalik(): void {
    const app = new GObalikApplication();
    container.setApplication(app);
    const createOrder = new GObalikCreateOrderConnector();
    const orderList = new GObalikOrderListConnector();
    const orderDetail = new GObalikOrderDetailConnector();

    createOrder
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createOrder);

    orderList
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(orderList);

    orderDetail
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(orderDetail);
}

function initCeskaPosta(): void {
    const app = new CeskaPostaApplication();
    container.setApplication(app);

    const parcelStatus = new CeskaPostaParcelStatusConnector();
    const getSendParcels = new CeskaPostaGetSendParcelsConnector();
    const parcelPrinting = new CeskaPostaParcelPrintingConnector();

    parcelStatus
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(parcelStatus);

    getSendParcels
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getSendParcels);

    parcelPrinting
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(parcelPrinting);
}

function initKatanaApp(): void {
    const app = new KatanaApplication();
    const listProducts = new KatanaListProductsBatch();
    const createProduct = new KatanaCreateProductConnector();
    const createCustomer = new KatanaCreateCustomerConnector();
    container.setApplication(app);

    listProducts
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(listProducts);

    createProduct
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createProduct);

    createCustomer
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createCustomer);
}

function initClickup(): void {
    const app = new ClickupApplication();
    container.setApplication(app);

    const getUser = new ClickupGetUserConnector();
    const createSpace = new ClickupCreateSpaceConnector();
    const createTask = new ClickupCreateTaskConnector();

    getUser
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getUser);

    createTask
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createTask);

    createSpace
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createSpace);
}

function initIntercom(): void {
    const app = new IntercomApplication(oauth2Provider);
    container.setApplication(app);

    const createContact = new IntercomCreateContactConnector();
    const listAllContacts = new IntercomListAllContactsBatch();
    createContact
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createContact);
    listAllContacts
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(listAllContacts);
}

function initOnesignal(): void {
    const app = new OnesignalApplication();
    container.setApplication(app);

    const viewsApps = new OnesignalViewAppsBatch();
    const createApp = new OnesignalCreateAppConnector();

    createApp
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createApp);

    viewsApps
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(viewsApps);
}

function initMerk(): void {
    const app = new MerkApplication();
    container.setApplication(app);

    const getCompany = new MerkGetCompanyConnector();
    const getSuggest = new MerkSuggestConnector();
    getCompany
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getCompany);

    getSuggest
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getSuggest);
}

function initGreenHouse(): void {
    const app = new GreenHouseApplication();
    container.setApplication(app);

    const listApp = new GreenHouseListAppBatch();
    const listCandidates = new GreenHouseListCandidatesBatch();
    const addCandidates = new GreenHouseAddCandidateConnector();

    listApp
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(listApp);

    listCandidates
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(listCandidates);

    addCandidates
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(addCandidates);
}
