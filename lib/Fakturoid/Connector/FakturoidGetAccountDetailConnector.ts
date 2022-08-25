import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AFakturoidConnector from './FakturoidAbstractConnector';

export default class FakturoidGetAccountDetailConnector extends AFakturoidConnector {

    protected name = 'fakturoid-get-account-detail';

    protected endpoint = 'account.json';

    protected method = HttpMethods.GET;

}
