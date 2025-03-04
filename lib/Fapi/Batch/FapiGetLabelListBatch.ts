import { NAME as APPLICATION_NAME } from '../FapiApplication';
import AFapiListBatch from './AFapiListBatch';

export const NAME = `${APPLICATION_NAME}-get-label-list-batch`;

export default class FapiGetLabelListBatch extends AFapiListBatch<unknown, IOutput> {

    public getName(): string {
        return NAME;
    }

    protected getUrl(): string {
        return 'labels';
    }

}

export interface IOutput {
    id: number,
    user_id: number,
    name: string,
    color: string
}
