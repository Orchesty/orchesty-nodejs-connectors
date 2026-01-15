import { checkErrorInResponse, NAME as APPLICATION_NAME, ResponseState } from '../PohodaApplication';
import APohodaListBatch from './APohodaListBatch';

export const NAME = `${APPLICATION_NAME}-get-address-book-list-batch`;

export const LAST_RUN_KEY = 'addressBook';

export enum Filter {
    LAST_CHANGES = 'lastChanges',
    DATE_FROM = 'dateFrom',
    COMPANY = 'company',
}

export default class PohodaGetAddressBookListBatch extends APohodaListBatch<unknown, IOutput, Filter> {

    public getName(): string {
        return NAME;
    }

    protected getKey(): string {
        return LAST_RUN_KEY;
    }

    protected getSchema(): string {
        return 'http://www.stormware.cz/schema/version_2/list_addBook.xsd';
    }

    // @ts-expect-error Intentionally
    protected getItems(response: IResponse): IOutput[] {
        const { responsePack } = response;
        checkErrorInResponse(responsePack);

        const { responsePackItem } = responsePack;
        checkErrorInResponse(responsePackItem);

        const { listAddressBook } = responsePackItem;

        return listAddressBook.addressbook ?? [];
    }

}

export interface IOutput {
    addressbookHeader: {
        id: number;
        identity: {
            address: {
                company: string;
                division: string;
                name: string;
                city: string;
                street: string;
                zip: string;
                ico: number;
                dic: string;
            };
        };
        region: string;
        phone: string;
        mobil: string;
        fax: string;
        email: string;
        web: string;
        adGroup: string;
        adKey: string;
        credit: number;
        priceIDS: string;
        maturity: number;
        paymentType: {
            id: number;
            ids: string;
            paymentType: string;
        };
        number: {
            id: number;
            ids: string;
            numberRequested: string;
        };
        foreignCurrency: {
            id: number;
            ids: string;
        };
        p1: boolean;
        p2: boolean;
        p3: boolean;
        p4: boolean;
        p5: boolean;
        p6: boolean;
    };
    addressbookAccount: {
        accountItem: {
            id: number;
            accountNumber: string;
            symSpec: string;
            bankCode: number;
            defaultAccount: boolean;
        };
    };
    version: number;
}

interface IResponse {
    responsePack: {
        responsePackItem: {
            listAddressBook: {
                addressbook: IOutput[];
            };
        };
        state: ResponseState;
        note: string;
    };
}
