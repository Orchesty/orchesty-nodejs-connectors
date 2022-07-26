import CoreServices from '@orchesty/nodejs-sdk/dist/lib/DIContainer/CoreServices';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import DIContainer from '@orchesty/nodejs-sdk/dist/lib/DIContainer/Container';
import Metrics from '@orchesty/nodejs-sdk/dist/lib/Metrics/Metrics';
import MongoDbClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Mongodb/Client';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { container as c, initiateContainer } from '@orchesty/nodejs-sdk';
import AllegroApplication from '../lib/Allegro/AllegroApplication';
import AllegroGetOrderDetailConnector from '../lib/Allegro/Connector/AllegroGetOrderDetailConnector';
import AllegroGetProductDetailConnector from '../lib/Allegro/Connector/AllegroGetProductDetailConnector';
import AllegroProposeProductConnector from '../lib/Allegro/Connector/AllegroProposeProductConnector';
import AlzaApplication from '../lib/Alza/AlzaApplication';
import AlzaCancelOrderConnector from '../lib/Alza/Connectors/AlzaCancelOrderConnector';
import AlzaConfirmOrderConnector from '../lib/Alza/Connectors/AlzaConfirmOrderConnector';
import AlzaCreateShipmentConnector from '../lib/Alza/Connectors/AlzaCreateShipmentConnector';
import AlzaInsetrOrderConnector from '../lib/Alza/Connectors/AlzaInsetrOrderConnector';
import AlzaTrackAndTraceConnector from '../lib/Alza/Connectors/AlzaTrackAndTraceConnector';
import AmazonApplication from '../lib/AmazonApps/SellingPartner/AmazonApplication';
import AmazonCreateShipmentConnector from '../lib/AmazonApps/SellingPartner/Connector/AmazonCreateShipmentConnector';
import BigcommerceApplication from '../lib/Bigcommerce/BigcommerceApplication';
import BigcommerceCreateOrderConnector from '../lib/Bigcommerce/Connector/BigcommerceCreateOrderConnector';
import BigcommerceCreateProductConnector from '../lib/Bigcommerce/Connector/BigcommerceCreateProductConnector';
import BulkGateApplicationApplication from '../lib/BulkGate/BulkGateApplicationApplication';
import BulkGateGetPromotionalSMSConnector from '../lib/BulkGate/Connectors/BulkGateGetPromotionalSMSConnector';
import BulkGateGetTransactionSMSConnector from '../lib/BulkGate/Connectors/BulkGateGetTransactionSMSConnector';
import MallApplication from '../lib/Mall/MallApplication';
import MallGetOrderDetailConnector from '../lib/Mall/Connector/MallGetOrderDetailConnector';
import MallGetOrderListBatch from '../lib/Mall/Batch/MallGetOrderListBatch';
import MallGetProductDetailConnector from '../lib/Mall/Connector/MallGetProductDetailConnector';
import MallGetProductListBatch from '../lib/Mall/Batch/MallGetProductListBatch';
import MallPostProductConnector from '../lib/Mall/Connector/MallPostProductConnector';
import MallPutOrdersConnector from '../lib/Mall/Connector/MallPutOrdersConnector';
import MallPutProductConnector from '../lib/Mall/Connector/MallPutProductConnector';
import NutshellApplication from '../lib/Nutshell/NutshellApplication';
import NutshellGetAccountConnector from '../lib/Nutshell/Connector/NutshellGetAccountConnector';
import NutshellNewAccountConnector from '../lib/Nutshell/Connector/NutshellNewAccountConnector';
import NutshellNewLeadConnector from '../lib/Nutshell/Connector/NutshellNewLeadConnector';
import NutshellNewTaskConnector from '../lib/Nutshell/Connector/NutshellNewTaskConnector';
import PipedriveAddLeadConnector from '../lib/Pipedrive/Connector/PipedriveAddLeadConnector';
import PipedriveApplication from '../lib/Pipedrive/PipedriveApplication';
import PipedriveGetAllLeadsBatch from '../lib/Pipedrive/Batch/PipedriveGetAllLeadsBatch';
import PipedriveUpdateLeadConnector from '../lib/Pipedrive/Connector/PipedriveUpdateLeadConnector';
import QuickBooksCreateItemConnector from '../lib/Quickbooks/QuickBooksCreateItemConnector';
import QuickBooksUpdateItemConnector from '../lib/Quickbooks/Connector/QuickBooksUpdateItemConnector';
import QuickbooksApplication from '../lib/Quickbooks/QuickbooksApplication';
import SalesForceApplication from '../lib/SalesForce/SalesForceApplication';
import SalesForceCreateRecordConnector from '../lib/SalesForce/Connector/SalesForceCreateRecordConnector';
import SalesForceUpdateRecordConnector from '../lib/SalesForce/Connector/SalesForceUpdateRecordConnector';
import TableauApplication from '../lib/Tableau/TableauApplication';
import TableauCreateNewResourceConnector from '../lib/Tableau/Connector/TableauCreateNewResourceConnector';
import WixApplication from '../lib/Wix/WixApplication';
import WixCreateOrderConnector from '../lib/Wix/Connector/WixCreateOrderConnector';
import WixCreateProductConnector from '../lib/Wix/Connector/WixCreateProductConnector';
import WixGetOrderConnector from '../lib/Wix/Connector/WixGetOrderConnector';
import WixUpdateProductConnector from '../lib/Wix/Connector/WixUpdateProductConnector';
import ZendeskApplication from '../lib/Zendesk/ZendeskApplication';
import ZendeskCreateTicketConnector from '../lib/Zendesk/Connector/ZendeskCreateTicketConnector';
import ZendeskCreateUserConnector from '../lib/Zendesk/Connector/ZendeskCreateUserConnector';
import ZendeskListTicketsBatch from '../lib/Zendesk/Batch/ZendeskListTicketsBatch';
import ZendeskListUsersBatch from '../lib/Zendesk/Batch/ZendeskListUsersBatch';
import ZohoAddRecordsConnector from '../lib/Zoho/Connector/ZohoAddRecordsConnector';
import ZohoApplication from '../lib/Zoho/ZohoApplication';
import ZohoGetRecordsConnector from '../lib/Zoho/Connector/ZohoGetRecordsConnector';
import FakturaonlineApplication from '../lib/Fakturaonline/FakturaonlineApplication';
import FakturaonlineCreateNewInvoiceConnector
  from '../lib/Fakturaonline/Connector/FakturaonlineCreateNewInvoiceConnector';
import AmazonGetOrdersBatch from '../lib/AmazonApps/SellingPartner/Batch/AmazonGetOrdersBatch';
import AmazonPutListingsItemConnector from '../lib/AmazonApps/SellingPartner/Connector/AmazonPutListingsItemConnector';
import AmazonGetListingsItemConnector from '../lib/AmazonApps/SellingPartner/Connector/AmazonGetListingsItemConnector';
import AllegroGetUsersOrderListBatch from '../lib/Allegro/Batch/AllegroGetUsersOrderListBatch';
import AllegroGetAvailableProductsBatch from '../lib/Allegro/Batch/AllegroGetAvailableProductsBatch';
import AllegroCreateDraftOfferConnector from '../lib/Allegro/Connector/AllegroCreateDraftOfferConnector';
import WedoApplication from '../lib/Wedo/WedoApplication';
import WedoGetPackageBatch from '../lib/Wedo/Batch/WedoGetPackageBatch';
import AmazonListCatalogItemsBatch from '../lib/AmazonApps/SellingPartner/Batch/AmazonListCatalogItemsBatch';
import MergadoApplication from '../lib/Mergado/MergadoApplication';
import MergadoListAppsBatch from '../lib/Mergado/Batch/MergadoListAppsBatch';
import MergadoGetUserConnector from '../lib/Mergado/Connector/MergadoGetUserConnector';
import MergadoGetProjectConnector from '../lib/Mergado/Connector/MergadoGetProjectConnector';
import TableauCreateConnectedAppConnector from '../lib/Tableau/Connector/TableauCreateConnectedAppConnector';
import GitHubApplication from '../lib/GitHub/GitHubApplication';
import GitHubGetAppConnector from '../lib/GitHub/Connector/GitHubGetAppConnector';
import VyfakturujApplication from '../lib/Vyfakturuj/VyfakturujApplication';
import VyfakturujCreateInvoiceConnector from '../lib/Vyfakturuj/Connector/VyfakturujCreateInvoiceConnector';
import VyfakturujCreateContactConnector from '../lib/Vyfakturuj/Connector/VyfakturujCreateContactConnector';
import MergadoCreateElementConnector from '../lib/Mergado/Connector/MergadoCreateElementConnector';
import TableauUpdateNewResource from '../lib/Tableau/Connector/TableauUpdateNewResourceConnector';
import PaypalApplication from '../lib/Paypal/PaypalApplication';
import PaypalCreateProductConnector from '../lib/Paypal/Connector/PaypalCreateProductConnector';
import PaypalCreateOrderConnector from '../lib/Paypal/Connector/PaypalCreateOrderConnector';
import PaypalCreatePayoutConnector from '../lib/Paypal/Connector/PaypalCreatePayoutConnector';
/* eslint-disable @typescript-eslint/no-use-before-define */

/* eslint-disable import/no-mutable-exports */
export let container: DIContainer;
export let db: MongoDbClient;
export let sender: CurlSender;
export let oauth2Provider: OAuth2Provider;
/* eslint-enable import/no-mutable-exports */

export async function prepare(): Promise<void> {
  await initiateContainer();
  container = c;
  db = container.get(CoreServices.MONGO);
  sender = container.get(CoreServices.CURL);
  oauth2Provider = container.get(CoreServices.OAUTH2_PROVIDER);

  initAmazon();
  initAllegro();
  initAlza();
  initBigcommerce();
  initBulkGate();
  initMall();
  initMergado();
  initNutshell();
  initPipedrive();
  initQuickBooks();
  initSalesForce();
  initTableau();
  initPaypal();
  initWix();
  initFakturaonline();
  initZendesk();
  initZoho();
  initGitHub();
  initWedo();
  iniVyfakturuj();
}

export async function closeConnection(): Promise<void> {
  await db.down();
  await (container.get(CoreServices.METRICS) as Metrics).close();
}

export async function dropCollection(collection: string) {
  const database = await db.db();
  try {
    await database.dropCollection(collection);
  } catch {
    // ...
  }
}

function initZoho(): void {
  const zohoApp = new ZohoApplication(oauth2Provider);
  const zohoAddRecordsConnector = new ZohoAddRecordsConnector();
  const zohoGetRecordsConnector = new ZohoGetRecordsConnector();
  container.setApplication(zohoApp);

  zohoAddRecordsConnector
    .setSender(sender)
    .setDb(db)
    .setApplication(zohoApp);
  container.setConnector(zohoAddRecordsConnector);

  zohoGetRecordsConnector
    .setSender(sender)
    .setDb(db)
    .setApplication(zohoApp);
  container.setConnector(zohoGetRecordsConnector);
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

function initZendesk(): void {
  const app = new ZendeskApplication(oauth2Provider);
  container.setApplication(app);

  const createUser = new ZendeskCreateUserConnector();
  const createTicket = new ZendeskCreateTicketConnector();
  const listUser = new ZendeskListUsersBatch();
  const listTicket = new ZendeskListTicketsBatch();

  createUser
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createUser);

  createTicket
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createTicket);

  listUser
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(listUser);

  listTicket
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(listTicket);
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

function initSalesForce(): void {
  const app = new SalesForceApplication(oauth2Provider);
  container.setApplication(app);

  const createRecord = new SalesForceCreateRecordConnector();
  const updateRecord = new SalesForceUpdateRecordConnector();

  createRecord
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createRecord);

  updateRecord
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(updateRecord);
}

function initQuickBooks(): void {
  const quickApp = new QuickbooksApplication(oauth2Provider);
  const quickBookCreateItemConnector = new QuickBooksCreateItemConnector();
  const quickBookUpdateItemConnector = new QuickBooksUpdateItemConnector();

  container.setApplication(quickApp);

  quickBookCreateItemConnector
    .setSender(sender)
    .setDb(db)
    .setApplication(quickApp);

  container.setConnector(quickBookCreateItemConnector);

  quickBookUpdateItemConnector
    .setSender(sender)
    .setDb(db)
    .setApplication(quickApp);
  container.setConnector(quickBookUpdateItemConnector);
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
  const tableauCreateNewResourceConnector = new TableauCreateNewResourceConnector();
  const tableauUpdateNewResourceConnector = new TableauUpdateNewResource();
  const tableauCreateConnectedAppConnector = new TableauCreateConnectedAppConnector();

  container.setApplication(tableauApp);

  tableauCreateNewResourceConnector
    .setSender(sender)
    .setDb(db)
    .setApplication(tableauApp);
  container.setConnector(tableauCreateNewResourceConnector);

  tableauUpdateNewResourceConnector
    .setSender(sender)
    .setDb(db)
    .setApplication(tableauApp);
  container.setConnector(tableauUpdateNewResourceConnector);

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

function initAlza(): void {
  const app = new AlzaApplication();
  container.setApplication(app);

  const createShipment = new AlzaCreateShipmentConnector();
  const insertOrder = new AlzaInsetrOrderConnector();
  const cancelOrder = new AlzaCancelOrderConnector();
  const confirmOrder = new AlzaConfirmOrderConnector();
  const trackAndTrace = new AlzaTrackAndTraceConnector();

  createShipment
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createShipment);

  insertOrder
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(insertOrder);

  cancelOrder
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(cancelOrder);

  confirmOrder
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(confirmOrder);

  trackAndTrace
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(trackAndTrace);
}

function initAllegro(): void {
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
  container.setApplication(app);

  createNewInvoice
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createNewInvoice);
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
function iniVyfakturuj(): void {
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

  getApp
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(getApp);
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
