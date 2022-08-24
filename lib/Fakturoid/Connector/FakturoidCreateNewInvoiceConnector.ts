import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AFakturoidConnector from './FakturoidAbstractConnector';

export default class FakturoidCreateNewInvoiceConnector extends AFakturoidConnector {

    protected name = 'fakturoid-create-new-invoice';

    protected endpoint = 'invoices.json';

    protected method = HttpMethods.POST;

}
