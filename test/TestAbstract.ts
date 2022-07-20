import { container as c, initiateContainer } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import DIContainer from '@orchesty/nodejs-sdk/dist/lib/DIContainer/Container';
import CoreServices from '@orchesty/nodejs-sdk/dist/lib/DIContainer/CoreServices';
import Metrics from '@orchesty/nodejs-sdk/dist/lib/Metrics/Metrics';
import MongoDbClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Mongodb/Client';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import AlzaApplication from '../lib/Alza/AlzaApplication';
import AlzaCancelOrderConnector from '../lib/Alza/Connectors/AlzaCancelOrderConnector';
import AlzaConfirmOrderConnector from '../lib/Alza/Connectors/AlzaConfirmOrderConnector';
import AlzaCreateShipmentConnector from '../lib/Alza/Connectors/AlzaCreateShipmentConnector';
import AlzaInsetrOrderConnector from '../lib/Alza/Connectors/AlzaInsetrOrderConnector';
import BigcommerceApplication from '../lib/Bigcommerce/BigcommerceApplication';
import BigcommerceCreateOrderConnector from '../lib/Bigcommerce/Connector/BigcommerceCreateOrderConnector';
import BigcommerceCreateProductConnector from '../lib/Bigcommerce/Connector/BigcommerceCreateProductConnector';
import BulkGateApplicationApplication from '../lib/BulkGate/BulkGateApplicationApplication';
import BulkGateGetPromotionalSMSConnector from '../lib/BulkGate/Connectors/BulkGateGetPromotionalSMSConnector';
import BulkGateGetTransactionSMSConnector from '../lib/BulkGate/Connectors/BulkGateGetTransactionSMSConnector';
import MallGetOrderListBatch from '../lib/Mall/Batch/MallGetOrderListBatch';
import MallGetProductListBatch from '../lib/Mall/Batch/MallGetProductListBatch';
import MallGetOrderDetailConnector from '../lib/Mall/Connector/MallGetOrderDetailConnector';
import MallGetProductDetailConnector from '../lib/Mall/Connector/MallGetProductDetailConnector';
import MallPostProductConnector from '../lib/Mall/Connector/MallPostProductConnector';
import MallPutOrdersConnector from '../lib/Mall/Connector/MallPutOrdersConnector';
import MallPutProductConnector from '../lib/Mall/Connector/MallPutProductConnector';
import MallApplication from '../lib/Mall/MallApplication';
import NutshellGetAccountConnector from '../lib/Nutshell/Connector/NutshellGetAccountConnector';
import NutshellNewAccountConnector from '../lib/Nutshell/Connector/NutshellNewAccountConnector';
import NutshellNewLeadConnector from '../lib/Nutshell/Connector/NutshellNewLeadConnector';
import NutshellNewTaskConnector from '../lib/Nutshell/Connector/NutshellNewTaskConnector';
import NutshellApplication from '../lib/Nutshell/NutshellApplication';
import PipedriveGetAllLeadsBatch from '../lib/Pipedrive/Batch/PipedriveGetAllLeadsBatch';
import PipedriveAddLeadConnector from '../lib/Pipedrive/Connector/PipedriveAddLeadConnector';
import PipedriveUpdateLeadConnector from '../lib/Pipedrive/Connector/PipedriveUpdateLeadConnector';
import PipedriveApplication from '../lib/Pipedrive/PipedriveApplication';
import QuickBooksUpdateItemConnector from '../lib/Quickbooks/Connector/QuickBooksUpdateItemConnector';
import QuickbooksApplication from '../lib/Quickbooks/QuickbooksApplication';
import QuickBooksCreateItemConnector from '../lib/Quickbooks/QuickBooksCreateItemConnector';
import SalesForceCreateRecordConnector from '../lib/SalesForce/Connector/SalesForceCreateRecordConnector';
import SalesForceUpdateRecordConnector from '../lib/SalesForce/Connector/SalesForceUpdateRecordConnector';
import SalesForceApplication from '../lib/SalesForce/SalesForceApplication';
import TableauCreateNewResourceConnector from '../lib/Tableau/Connector/TableauCreateNewResourceConnector';
import TableauApplication from '../lib/Tableau/TableauApplication';
import WixCreateOrderConnector from '../lib/Wix/Connector/WixCreateOrderConnector';
import WixCreateProductConnector from '../lib/Wix/Connector/WixCreateProductConnector';
import WixGetOrderConnector from '../lib/Wix/Connector/WixGetOrderConnector';
import WixUpdateProductConnector from '../lib/Wix/Connector/WixUpdateProductConnector';
import WixApplication from '../lib/Wix/WixApplication';
import ZendeskListTicketsBatch from '../lib/Zendesk/Batch/ZendeskListTicketsBatch';
import ZendeskListUsersBatch from '../lib/Zendesk/Batch/ZendeskListUsersBatch';
import ZendeskCreateTicketConnector from '../lib/Zendesk/Connector/ZendeskCreateTicketConnector';
import ZendeskCreateUserConnector from '../lib/Zendesk/Connector/ZendeskCreateUserConnector';
import ZendeskApplication from '../lib/Zendesk/ZendeskApplication';
import ZohoAddRecordsConnector from '../lib/Zoho/Connector/ZohoAddRecordsConnector';
import ZohoGetRecordsConnector from '../lib/Zoho/Connector/ZohoGetRecordsConnector';
import ZohoApplication from '../lib/Zoho/ZohoApplication';
import AllegroApplication from '../lib/Allegro/AllegroApplication';
import AllegroGetProductDetailConnector from '../lib/Allegro/Connector/AllegroGetProductDetailConnector';
import AllegroProposeProductConnector from '../lib/Allegro/Connector/AllegroProposeProductConnector';
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

  initAllegro();
  initAlza();
  initBigcommerce();
  initBulkGate();
  initMall();
  initNutshell();
  initPipedrive();
  initQuickBooks();
  initSalesForce();
  initTableau();
  initWix();
  initZendesk();
  initZoho();
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

  container.setApplication(tableauApp);

  tableauCreateNewResourceConnector
    .setSender(sender)
    .setDb(db)
    .setApplication(tableauApp);
  container.setConnector(tableauCreateNewResourceConnector);
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
}

function initAllegro(): void {
  const app = new AllegroApplication(oauth2Provider);
  container.setApplication(app);

  const getProductDetail = new AllegroGetProductDetailConnector();
  const proposeProduct = new AllegroProposeProductConnector();

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
}
