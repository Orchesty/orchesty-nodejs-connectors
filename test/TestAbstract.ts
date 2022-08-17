import CoreServices from '@orchesty/nodejs-sdk/dist/lib/DIContainer/CoreServices';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import DIContainer from '@orchesty/nodejs-sdk/dist/lib/DIContainer/Container';
import Metrics from '@orchesty/nodejs-sdk/dist/lib/Metrics/Metrics';
import MongoDbClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Mongodb/Client';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import { container as c, initiateContainer } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import CacheService from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import AmazonApplication from '../lib/AmazonApps/SellingPartner/AmazonApplication';
import AmazonCreateShipmentConnector from '../lib/AmazonApps/SellingPartner/Connector/AmazonCreateShipmentConnector';
import AmazonGetListingsItemConnector from '../lib/AmazonApps/SellingPartner/Connector/AmazonGetListingsItemConnector';
import AmazonGetOrdersBatch from '../lib/AmazonApps/SellingPartner/Batch/AmazonGetOrdersBatch';
import AmazonListCatalogItemsBatch from '../lib/AmazonApps/SellingPartner/Batch/AmazonListCatalogItemsBatch';
import AmazonPutListingsItemConnector from '../lib/AmazonApps/SellingPartner/Connector/AmazonPutListingsItemConnector';
import BigcommerceApplication from '../lib/Bigcommerce/BigcommerceApplication';
import BigcommerceCreateOrderConnector from '../lib/Bigcommerce/Connector/BigcommerceCreateOrderConnector';
import BigcommerceCreateProductConnector from '../lib/Bigcommerce/Connector/BigcommerceCreateProductConnector';
import BulkGateApplicationApplication from '../lib/BulkGate/BulkGateApplicationApplication';
import BulkGateGetPromotionalSMSConnector from '../lib/BulkGate/Connectors/BulkGateGetPromotionalSMSConnector';
import BulkGateGetTransactionSMSConnector from '../lib/BulkGate/Connectors/BulkGateGetTransactionSMSConnector';
import CalendlyApplication from '../lib/Calendly/CalendlyApplication';
import CalendlyGetUserConnector from '../lib/Calendly/Connector/CalendlyGetUserConnector';
import CalendlyInviteUserConnector from '../lib/Calendly/Connector/CalendlyInviteUserConnector';
import CalendlyListEventsBatch from '../lib/Calendly/Batch/CalendlyListEventsBatch';
import CeskaPostaApplication from '../lib/CeskaPosta/CeskaPostaApplication';
import CeskaPostaGetSendParcelsConnector from '../lib/CeskaPosta/Connectors/CeskaPostaGetSendParcelsConnector';
import CeskaPostaParcelPrintingConnector from '../lib/CeskaPosta/Connectors/CeskaPostaParcelPrintingConnector';
import CeskaPostaParcelStatusConnector from '../lib/CeskaPosta/Connectors/CeskaPostaParcelStatusConnector';
import ClickupApplication from '../lib/Clickup/ClickupApplication';
import ClickupGetUserConnector from '../lib/Clickup/Connectors/ClickupGetUserConnector';
import FakturaonlineApplication from '../lib/Fakturaonline/FakturaonlineApplication';
import FakturaonlineCreateNewInvoiceConnector
  from '../lib/Fakturaonline/Connector/FakturaonlineCreateNewInvoiceConnector';
import FakturaonlineGetInvoiceConnector from '../lib/Fakturaonline/Connector/FakturaonlineGetInvoiceConnector';
import FakturaonlineUpdateInvoiceConnector from '../lib/Fakturaonline/Connector/FakturaonlineUpdateInvoiceConnector';
import GitHubApplication from '../lib/GitHub/GitHubApplication';
import GitHubGetAppConnector from '../lib/GitHub/Connector/GitHubGetAppConnector';
import GitHubGeRespositoriesBatch from '../lib/GitHub/Batch/GitHubRepositoriesBatch';
import GObalikApplication from '../lib/GObalik/GObalikApplication';
import GObalikCreateOrderConnector from '../lib/GObalik/Connectors/GObalikCreateOrderConnector';
import GObalikOrderDetailConnector from '../lib/GObalik/Connectors/GObalikOrderDetailConnector';
import GObalikOrderListConnector from '../lib/GObalik/Connectors/GObalikOrderListConnector';
import IntercomApplication from '../lib/Intercom/IntercomApplication';
import IntercomCreateContactConnector from '../lib/Intercom/Connector/IntercomCreateContactConnector';
import KatanaApplication from '../lib/Katana/KatanaApplication';
import KatanaCreateCustomerConnector from '../lib/Katana/Connectors/KatanaCreateCustomerConnector';
import KatanaCreateProductConnector from '../lib/Katana/Connectors/KatanaCreateProductConnector';
import KatanaListProductsBatch from '../lib/Katana/Batch/KatanaListProductsBatch';
import MallApplication from '../lib/Mall/MallApplication';
import MallGetOrderDetailConnector from '../lib/Mall/Connector/MallGetOrderDetailConnector';
import MallGetOrderListBatch from '../lib/Mall/Batch/MallGetOrderListBatch';
import MallGetProductDetailConnector from '../lib/Mall/Connector/MallGetProductDetailConnector';
import MallGetProductListBatch from '../lib/Mall/Batch/MallGetProductListBatch';
import MallPostProductConnector from '../lib/Mall/Connector/MallPostProductConnector';
import MallPutOrdersConnector from '../lib/Mall/Connector/MallPutOrdersConnector';
import MallPutProductConnector from '../lib/Mall/Connector/MallPutProductConnector';
import MergadoApplication from '../lib/Mergado/MergadoApplication';
import MergadoCreateElementConnector from '../lib/Mergado/Connector/MergadoCreateElementConnector';
import MergadoGetProjectConnector from '../lib/Mergado/Connector/MergadoGetProjectConnector';
import MergadoGetUserConnector from '../lib/Mergado/Connector/MergadoGetUserConnector';
import MergadoListAppsBatch from '../lib/Mergado/Batch/MergadoListAppsBatch';
import NutshellApplication from '../lib/Nutshell/NutshellApplication';
import NutshellGetAccountConnector from '../lib/Nutshell/Connector/NutshellGetAccountConnector';
import NutshellNewAccountConnector from '../lib/Nutshell/Connector/NutshellNewAccountConnector';
import NutshellNewLeadConnector from '../lib/Nutshell/Connector/NutshellNewLeadConnector';
import NutshellNewTaskConnector from '../lib/Nutshell/Connector/NutshellNewTaskConnector';
import PaypalApplication from '../lib/Paypal/PaypalApplication';
import PaypalCreateOrderConnector from '../lib/Paypal/Connector/PaypalCreateOrderConnector';
import PaypalCreatePayoutConnector from '../lib/Paypal/Connector/PaypalCreatePayoutConnector';
import PaypalCreateProductConnector from '../lib/Paypal/Connector/PaypalCreateProductConnector';
import PipedriveAddLeadConnector from '../lib/Pipedrive/Connector/PipedriveAddLeadConnector';
import PipedriveApplication from '../lib/Pipedrive/PipedriveApplication';
import PipedriveGetAllLeadsBatch from '../lib/Pipedrive/Batch/PipedriveGetAllLeadsBatch';
import PipedriveUpdateLeadConnector from '../lib/Pipedrive/Connector/PipedriveUpdateLeadConnector';
import ProductboardApplication from '../lib/Productboard/ProductboardApplication';
import ProductboardCreateNewFeatureConnector from '../lib/Productboard/Connector/ProductboardCreateNewFeatureConnector';
import ProductboardListAllFeaturesBatch from '../lib/Productboard/Batch/ProductboardListAllFeaturesBatch';
import ProductboardListAllProductsBatch from '../lib/Productboard/Batch/ProductboardListAllProductsBatch';
import TableauApplication from '../lib/Tableau/TableauApplication';
import TableauCreateConnectedAppConnector from '../lib/Tableau/Connector/TableauCreateConnectedAppConnector';
import TableauGetConnectedAppConnector from '../lib/Tableau/Connector/TableauGetConnectedAppConnector';
import TodoistApplication from '../lib/Todoist/TodoistApplication';
import TodoistCreateNewTaskConnector from '../lib/Todoist/Connector/TodoistCreateNewTaskConnector';
import TodoistCreateProjectConnector from '../lib/Todoist/Connector/TodoistCreateProjectConnector';
import TodoistGetAllProjectsBatch from '../lib/Todoist/Batch/TodoistGetAllProjectsBatch';
import TwitterApplication from '../lib/Twitter/TwitterApplication';
import TwitterDeleteTweetConnector from '../lib/Twitter/Connector/TwitterDeleteTweetConnector';
import TwitterGetFollowersBatch from '../lib/Twitter/Batch/TwitterGetFollowersBatch';
import TwitterPostATweetConnector from '../lib/Twitter/Connector/TwitterPostATweetConnector';
import TypeformApplication from '../lib/Typeform/TypeformApplication';
import TypeformCreateFormConnector from '../lib/Typeform/Connector/TypeformCreateFormConnector';
import TypeformCreateWorkspaceConnector from '../lib/Typeform/Connector/TypeformCreateWorkspaceConnector';
import TypeformUpdateFormConnector from '../lib/Typeform/Connector/TypeformUpdateFormConnector';
import VyfakturujApplication from '../lib/Vyfakturuj/VyfakturujApplication';
import VyfakturujCreateContactConnector from '../lib/Vyfakturuj/Connector/VyfakturujCreateContactConnector';
import VyfakturujCreateInvoiceConnector from '../lib/Vyfakturuj/Connector/VyfakturujCreateInvoiceConnector';
import WedoApplication from '../lib/Wedo/WedoApplication';
import WedoGetPackageBatch from '../lib/Wedo/Batch/WedoGetPackageBatch';
import WixApplication from '../lib/Wix/WixApplication';
import WixCreateOrderConnector from '../lib/Wix/Connector/WixCreateOrderConnector';
import WixCreateProductConnector from '../lib/Wix/Connector/WixCreateProductConnector';
import WixGetOrderConnector from '../lib/Wix/Connector/WixGetOrderConnector';
import WixUpdateProductConnector from '../lib/Wix/Connector/WixUpdateProductConnector';
import ClickupCreateTaskConnector from '../lib/Clickup/Connectors/ClickupCreateTaskConnector';
import ClickupCreateSpaceConnector from '../lib/Clickup/Connectors/ClickupCreateSpaceConnector';
import OnesignalApplication from '../lib/Onesignal/OnesignalApplication';
import OnesignalViewAppsBatch from '../lib/Onesignal/Batch/OnesignalViewAppsBatch';
import OnesignalCreateAppConnector from '../lib/Onesignal/Connectors/OnesignalCreateAppConnector';
import IntercomListAllContactsBatch from '../lib/Intercom/Batch/IntercomListAllContactsBatch';
import MerkApplication from '../lib/Merk/MerkApplication';
import MerkGetCompanyConnector from '../lib/Merk/Connector/MerkGetCompanyConnector';
import MerkSuggestConnector from '../lib/Merk/Connector/MerkSuggestConnector';
import GreenHouseApplication from '../lib/GreenHouse/GreenHouseApplication';
import GreenHouseListAppBatch from '../lib/GreenHouse/Batch/GreenHouseListAppBatch';
import GreenHouseListCandidatesBatch from '../lib/GreenHouse/Batch/GreenHouseListCandidatesBatch';
import GreenHouseAddCandidateConnector from '../lib/GreenHouse/connector/GreenHouseAddCandidateConnector';
import MondayApplication from '../lib/Monday/MondayApplication';
import MondayCreateGroupConnector from '../lib/Monday/Connector/MondayCreateGroupConnector';
import MondayCreateItemConnector from '../lib/Monday/Connector/MondayCreateItemConnector';
import MondayCreateBoardConnector from '../lib/Monday/Connector/MondayCreateBoardConnector';
import BoxApplication from '../lib/Box/BoxApplication';
import BoxGetCollaborationConnector from '../lib/Box/Connector/BoxGetCollaborationConnector';
import BoxGetUserConnector from '../lib/Box/Connector/BoxGetUserConnector';
import BoxListTasksBatch from '../lib/Box/Batch/BoxListTasksBatch';
import GitHubGetRepositoryConnector from '../lib/GitHub/Connector/GitHubGetRepositoryConnector';
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

  initAmazon();
  initBigcommerce();
  initBox();
  initBulkGate();
  initCalendly();
  initCeskaPosta();
  initClickup();
  initFakturaonline();
  initGObalik();
  initGitHub();
  initGreenHouse();
  initIntercom();
  initKatanaApp();
  initMall();
  initMergado();
  initMerk();
  initMonday();
  initNutshell();
  initPaypal();
  initPipedrive();
  initProductboard();
  initTableau();
  initTodoist();
  initTwitter();
  initTypeform();
  initVyfakturuj();
  initWedo();
  initWix();
  initOnesignal();

  initiated = true;
}

export async function closeConnection(): Promise<void> {
  await db.down();
  await (container.get(CoreServices.METRICS) as Metrics).close();
  await (container.get(CoreServices.REDIS) as Redis).close();
}

export async function dropCollection(collection: string) {
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

function initBigcommerce(): void {
  const app = new BigcommerceApplication(oauth2Provider);
  const createOrder = new BigcommerceCreateOrderConnector();
  const createProduct = new BigcommerceCreateProductConnector();
  container.setApplication(app);

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

function initBulkGate(): void {
  const bulkGateApp = new BulkGateApplicationApplication();
  const bulkGateGetPromotionalSMSConnector = new BulkGateGetPromotionalSMSConnector();
  const bulkGateGetTransactionSMSConnector = new BulkGateGetTransactionSMSConnector();
  container.setApplication(bulkGateApp);

  bulkGateGetPromotionalSMSConnector
    .setSender(sender)
    .setDb(db)
    .setApplication(bulkGateApp);
  container.setConnector(bulkGateGetPromotionalSMSConnector);

  bulkGateGetTransactionSMSConnector
    .setSender(sender)
    .setDb(db)
    .setApplication(bulkGateApp);
  container.setConnector(bulkGateGetTransactionSMSConnector);
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

function initAmazon(): void {
  const app = new AmazonApplication(sender);
  container.setApplication(app);

  const createShipment = new AmazonCreateShipmentConnector();
  const listCatalogItem = new AmazonListCatalogItemsBatch();
  const putListingsItem = new AmazonPutListingsItemConnector();
  const getListingsItem = new AmazonGetListingsItemConnector();
  const getOrders = new AmazonGetOrdersBatch();

  createShipment
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createShipment);

  listCatalogItem
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(listCatalogItem);

  getOrders
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(getOrders);

  putListingsItem
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(putListingsItem);

  getListingsItem
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(getListingsItem);
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

function initMergado(): void {
  const app = new MergadoApplication(oauth2Provider);
  container.setApplication(app);

  const listApps = new MergadoListAppsBatch();
  const getUser = new MergadoGetUserConnector();
  const getProject = new MergadoGetProjectConnector();
  const createElement = new MergadoCreateElementConnector();
  listApps
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(listApps);
  getUser
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(getUser);
  getProject
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(getProject);
  createElement
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createElement);
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

function initProductboard(): void {
  const app = new ProductboardApplication();
  container.setApplication(app);

  const listAllFeatures = new ProductboardListAllFeaturesBatch();
  const listAllProducts = new ProductboardListAllProductsBatch();
  const createNewFeature = new ProductboardCreateNewFeatureConnector();

  listAllFeatures
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(listAllFeatures);
  listAllProducts
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(listAllProducts);
  createNewFeature
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createNewFeature);
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

function initCalendly(): void {
  const app = new CalendlyApplication(oauth2Provider);
  container.setApplication(app);
  const getUser = new CalendlyGetUserConnector();
  const listEvents = new CalendlyListEventsBatch();
  const inviteUser = new CalendlyInviteUserConnector();

  getUser
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(getUser);
  listEvents
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(listEvents);
  inviteUser
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(inviteUser);
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

function initTypeform(): void {
  const app = new TypeformApplication(oauth2Provider);
  container.setApplication(app);

  const createForm = new TypeformCreateFormConnector();
  const updateForm = new TypeformUpdateFormConnector();
  const createWorkspace = new TypeformCreateWorkspaceConnector();

  createForm
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createForm);
  updateForm
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(updateForm);
  createWorkspace
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createWorkspace);
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

function initTodoist(): void {
  const app = new TodoistApplication(oauth2Provider);
  container.setApplication(app);

  const createProject = new TodoistCreateProjectConnector();
  const getAllProjects = new TodoistGetAllProjectsBatch();
  const createNewTask = new TodoistCreateNewTaskConnector();
  createProject
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createProject);
  getAllProjects
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(getAllProjects);
  createNewTask
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createNewTask);
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

function initMonday(): void {
  const app = new MondayApplication();
  container.setApplication(app);

  const createGroup = new MondayCreateGroupConnector();
  const createBoard = new MondayCreateBoardConnector();
  const createItem = new MondayCreateItemConnector();
  createBoard
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createBoard);
  createGroup
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createGroup);
  createItem
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createItem);
}

function initBox(): void {
  const app = new BoxApplication(oauth2Provider);
  container.setApplication(app);

  const getCollaboration = new BoxGetCollaborationConnector();
  const getUser = new BoxGetUserConnector();
  const listTasks = new BoxListTasksBatch();
  getCollaboration
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(getCollaboration);
  getUser
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(getUser);
  listTasks
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(listTasks);
}
