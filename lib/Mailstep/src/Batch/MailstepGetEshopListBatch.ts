import { NAME as APPLICATION_NAME } from '../MailstepApplication';
import AMailstepListBatch from './AMailstepListBatch';

export const NAME = `${APPLICATION_NAME}-get-eshop-list-batch`;

export const LAST_RUN_KEY = 'eshop/list';

export enum Select {
    ID = 'id',
    NAME = 'name', // eslint-disable-line @typescript-eslint/no-shadow
    URL_SLUG = 'urlSlug',
    ORGANISATION = 'organisation',
    DEFAULT_WAREHOUSE = 'defaultWarehouse',
    WAREHOUSES = 'warehouses',
    ACTIVE = 'active',
    CREATED_AT = 'createdAt',
    PARTNERS = 'partners',
    SALES_CHANNEL_ID = 'salesChannelId',
    WAIT_BEFORE_PROCESSING = 'waitBeforeProcessing',
    EDIT_BEFORE_PROCESSING = 'editBeforeProcessing',
    INTEGRATION_TYPE = 'integrationType',
    CHANGED_AT = 'changedAt',
}

export enum Filter {
    ID = 'id',
    NAME = 'name', // eslint-disable-line @typescript-eslint/no-shadow
    ORGANISATION = 'organisation',
    DEFAULT_WAREHOUSE = 'defaultWarehouse',
    ACTIVE = 'active'
}

export enum Sorter {
    NAME = 'name', // eslint-disable-line @typescript-eslint/no-shadow
    URL_SLUG = 'urlSlug',
    CREATED_AT = 'createdAt',
    INTEGRATION_TYPE = 'integrationType',
    CHANGED_AT = 'changedAt'
}

export default class MailstepGetEshopListBatch extends AMailstepListBatch<
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
    urlSlug: string;
    organisation: string;
    defaultWarehouse: string;
    warehouses: string[];
    active: boolean;
    createdAt: string;
    partners: {
        id: string;
        eshop: string;
        code: number;
        name: string;
        companyName: string;
        firstName: string;
        lastName: string;
        degree: string;
        degree2: string;
        street: string;
        houseNr: string;
        city: string;
        zip: number;
        country: string;
        phone: string;
        email: string;
        registrationNumber: number;
        vatNumber: string;
        note: string;
        active: boolean;
        createdAt: string;
        ref1: string;
        ref2: string;
        ref3: string;
        changedAt: string;
    }[];
    salesChannelId: string;
    waitBeforeProcessing: boolean;
    editBeforeProcessing: boolean;
    integrationType: string;
    changedAt: string;
}
