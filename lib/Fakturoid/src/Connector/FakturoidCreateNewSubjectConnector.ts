import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AFakturoidConnector from './FakturoidAbstractConnector';

export default class FakturoidCreateNewSubjectConnector extends AFakturoidConnector {

    protected name = 'fakturoid-create-new-subject';

    protected endpoint = 'subjects.json';

    protected method = HttpMethods.POST;

}
