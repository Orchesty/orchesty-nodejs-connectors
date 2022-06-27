import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AFakturoidConnector from './FakturoidAbstractConnector';

export default class FakturoidCreateNewInvoiceConnector extends AFakturoidConnector {
  protected _name = 'fakturoid-create-new-invoice';

  protected _endpoint = 'invoices.json';

  protected _method = HttpMethods.POST;
}
