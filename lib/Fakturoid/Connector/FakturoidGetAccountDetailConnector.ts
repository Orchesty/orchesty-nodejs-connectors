import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import AFakturoidConnector from './FakturoidAbstractConnector';

export default class FakturoidGetAccountDetailConnector extends AFakturoidConnector {
  protected _name = 'fakturoid-get-account-detail';

  protected _endpoint = 'account.json';

  protected _method = HttpMethods.GET;
}
