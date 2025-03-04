import { NAME as APPLICATION_NAME } from '../FapiApplication';
import AFapiListBatch from './AFapiListBatch';

export const NAME = `${APPLICATION_NAME}-get-project-list-batch`;

export default class FapiGetProjectListBatch extends AFapiListBatch<unknown, IOutput> {

    public getName(): string {
        return NAME;
    }

    protected getUrl(): string {
        return 'projects';
    }

}

export interface IOutput {
    /* eslint-disable @typescript-eslint/naming-convention */
    id: number;
    hidden: boolean;
    name: string;
    code: string;
    email: string;
    is_default: boolean;
    has_different_logo: boolean;
    logo: string;
    has_different_signature: boolean;
    signature: string;
    has_different_bank_account_set: boolean;
    bank_account_set: boolean;
    has_different_sender: boolean;
    sender_email: string;
    sender_name: string;
    sender_reply_to: string;
    forms: {
        id: number;
        name: string;
        path: string;
    }[];
    /* eslint-enable @typescript-eslint/naming-convention */
}
