import { NAME as APPLICATION_NAME } from '../MailstepApplication';
import AMailstepListBatch from './AMailstepListBatch';

export const NAME = `${APPLICATION_NAME}-get-carrier-service-list-batch`;

export enum Select {
    ID = 'id',
    NAME = 'name', // eslint-disable-line @typescript-eslint/no-shadow
    CODE = 'code',
    CREATED_AT = 'createdAt',
    PICKUP_PLACE_IGNORE = 'pickupPlaceIgnore',
    PICKUP_PLACE_MANDATORY = 'pickupPlaceMandatory',
    EMAIL_MANDATORY = 'emailMandatory',
    PHONE_MANDATORY = 'phoneMandatory',
    NAME_MANDATORY = 'nameMandatory',
    LEGACY_DISPENSE = 'legacyDispense',
    SKIP_DELIVERY_STATUS = 'skipDeliveryStatus',
    CARRIER = 'carrier',
    COUNTRIES_OF_OPERATION = 'countriesOfOperation',
    LOCKED_FOR_IMPORT = 'lockedForImport',
    CARRIER_PICKUP_PLACE = 'carrierPickupPlace',
    INVOICE_MANDATORY_OUTSIDE_EU = 'invoiceMandatoryOutsideEU',
    CHANGED_AT = 'changedAt',
}

export enum Filter {
    ID = 'id',
    NAME = 'name', // eslint-disable-line @typescript-eslint/no-shadow
    CODE = 'code',
    PICKUP_PLACE_MANDATORY = 'pickupPlaceMandatory',
    CARRIER = 'carrier',
    CARRIER_CODE = 'carrier.code',
    CARRIER_NAME = 'carrier.name',
    CARRIER_PICKUP_PLACE = 'carrierPickupPlace',
}

export enum Sorter {
    NAME = 'name', // eslint-disable-line @typescript-eslint/no-shadow
    CODE = 'code',
    CREATED_AT = 'createdAt',
    PICKUP_PLACE_IGNORE = 'pickupPlaceIgnore',
    PICKUP_PLACE_MANDATORY = 'pickupPlaceMandatory',
    EMAIL_MANDATORY = 'emailMandatory',
    PHONE_MANDATORY = 'phoneMandatory',
    NAME_MANDATORY = 'nameMandatory',
    LEGACY_DISPENSE = 'legacyDispense',
    SKIP_DELIVERY_STATUS = 'skipDeliveryStatus',
    INVOICE_MANDATORY_OUTSIDE_EU = 'invoiceMandatoryOutsideEU',
    CHANGED_AT = 'changedAt',
}

export default class MailstepGetCarrierServiceListBatch extends AMailstepListBatch<
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
        return 'carrier-service/list';
    }

}

export interface IOutput {
    id: string;
    name: string;
    code: number;
    createdAt: string;
    pickupPlaceIgnore: boolean;
    pickupPlaceMandatory: boolean;
    emailMandatory: boolean;
    phoneMandatory: boolean;
    nameMandatory: boolean;
    legacyDispense: boolean;
    skipDeliveryStatus: boolean;
    carrier: string;
    countriesOfOperation: string[];
    lockedForImport: boolean;
    carrierPickupPlace: string[];
    invoiceMandatoryOutsideEU: boolean;
    changedAt: string;
}
