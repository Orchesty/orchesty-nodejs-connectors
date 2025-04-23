import { NAME as APPLICATION_NAME } from '../MailstepApplication';
import AMailstepListBatch from './AMailstepListBatch';

export const NAME = `${APPLICATION_NAME}-get-wms-list-batch`;

export const LAST_RUN_KEY = 'wms/list';

export enum Select {
    ID = 'id',
    NAME = 'name', // eslint-disable-line @typescript-eslint/no-shadow
    ORGANISATION = 'organisation',
    DISTRIBUTION_CENTER = 'distributionCenter',
    STORE_KEY = 'storeKey',
    INTERNAL_ID = 'internalId',
    CREATED_AT = 'createdAt',
    WAREHOUSES = 'warehouses',
    TYPE = 'type',
    CHANGED_AT = 'changedAt',
}

export enum Filter {
    ID = 'id',
    NAME = 'name', // eslint-disable-line @typescript-eslint/no-shadow
    ORGANISATION = 'organisation',
    STORE_KEY = 'storeKey',
}

export enum Sorter {
    NAME = 'name', // eslint-disable-line @typescript-eslint/no-shadow
    STORE_KEY = 'storeKey',
    INTERNAL_ID = 'internalId',
    CREATED_AT = 'createdAt',
    TYPE = 'type',
    CHANGED_AT = 'changedAt',
}

export default class MailstepGetWmsListBatch extends AMailstepListBatch<
    unknown,
    IOutput,
    Select,
    Filter,
    Sorter
> {

    public getName(): string {
        return NAME;
    }

    protected getUrl(): string {
        return LAST_RUN_KEY;
    }

}

export interface IOutput {
    id: string;
    name: string;
    organisation: string;
    distributionCenter: string;
    storeKey: string;
    internalId: string;
    createdAt: string;
    warehouses: string[];
    type: string;
    changedAt: string;
}
