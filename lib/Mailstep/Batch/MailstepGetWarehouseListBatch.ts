import { NAME as APPLICATION_NAME } from '../MailstepApplication';
import AMailstepListBatch from './AMailstepListBatch';

export const NAME = `${APPLICATION_NAME}-get-warehouse-list-batch`;

export enum Select {
    ID = 'id',
    NAME = 'name', // eslint-disable-line @typescript-eslint/no-shadow
    CUSTOM_ID = 'customId',
    WMSES = 'wmses',
    DEFAULT_WMS = 'defaultWms',
    CREATED_AT = 'createdAt',
    ORGANISATION = 'organisation',
    DMG = 'dmg',
    TYPE = 'type',
    SCRAPING_WAREHOUSE = 'scrapingWarehouse',
    CHANGED_AT = 'changedAt',
}

export enum Filter {
    ID = 'id',
    NAME = 'name', // eslint-disable-line @typescript-eslint/no-shadow
    ORGANISATION = 'organisation',
    ORGANISATION_NAME = 'organisation.name',
    ESHOPS = 'eshops',
    ESHOPS_NAME = 'eshops.name',
    CUSTOM_ID = 'customId',
    WMSES = 'wmses',
    WMSES_NAME = 'wmses.name',
}

export enum Sorter {
    NAME = 'name', // eslint-disable-line @typescript-eslint/no-shadow
    CUSTOM_ID = 'customId',
    CREATED_AT = 'createdAt',
    TYPE = 'type',
    CHANGED_AT = 'changedAt',
}

export default class MailstepGetWarehouseListBatch extends AMailstepListBatch<
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
        return 'warehouse/list';
    }

}

export interface IOutput {
    id: string;
    name: string;
    customId: string;
    wms: string[];
    defaultWms: string;
    createdAt: string;
    organisation: string;
    dmg: boolean;
    type: string;
    scrapingWarehouse: string;
    changedAt: string;
}
