import { NAME as APPLICATION_NAME } from '../MailstepApplication';
import AMailstepListBatch from './AMailstepListBatch';

export const NAME = `${APPLICATION_NAME}-get-carrier-list-batch`;

export enum Select {
    ID = 'id',
    NAME = 'name', // eslint-disable-line @typescript-eslint/no-shadow
    CODE = 'code',
    CREATED_AT = 'createdAt',
    SERVICES = 'services',
    COUNTRIES_OF_OPERATION = 'countriesOfOperation',
    LOCKED_FOR_IMPORT = 'lockedForImport',
    IMAGE_UPLOADED_AT = 'imageUploadedAt',
    EXCLUDED_EXPEDITION_ADDRESS_VALIDATIONS = 'excludedExpeditionAddressValidations',
    COD = 'cod',
    VALIDATE_PICKUP_PLACE_COUNTRY = 'validatePickupPlaceCountry',
    CHANGED_AT = 'changedAt',
}

export enum Filter {
    ID = 'id',
    NAME = 'name', // eslint-disable-line @typescript-eslint/no-shadow
    CODE = 'code',
    SERVICES = 'services',
    PICKUP_PLACES = 'pickupPlaces',
    ORGANISATIONS = 'organisations',
    ORGANISATIONS_NAME = 'organisations.name',
}

export enum Sorter {
    NAME = 'name', // eslint-disable-line @typescript-eslint/no-shadow
    CODE = 'code',
    CREATED_AT = 'createdAt',
    IMAGE_UPLOADED_AT = 'imageUploadedAt',
    COD = 'cod',
    CHANGED_AT = 'changedAt',
}

export default class MailstepGetCarrierListBatch extends AMailstepListBatch<
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
        return 'carrier/list';
    }

}

export interface IOutput {
    id: string;
    name: string;
    code: number;
    createdAt: string;
    services: string[];
    countriesOfOperation: string[];
    lockedForImport: boolean;
    imageUploadedAt: string;
    excludedExpeditionAddressValidations: string[];
    cod: boolean;
    validatePickupPlaceCountry: boolean;
    changedAt: string;
    imageUrl: string;
}
