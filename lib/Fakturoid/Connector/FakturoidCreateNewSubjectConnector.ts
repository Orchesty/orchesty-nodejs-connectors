import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import AFakturoidConnector from './FakturoidAbstractConnector';

export default class FakturoidCreateNewSubjectConnector extends AFakturoidConnector {
  protected _name = 'fakturoid-create-new-subject';

  protected _endpoint = 'subjects.json';

  protected _method = HttpMethods.POST;
}
