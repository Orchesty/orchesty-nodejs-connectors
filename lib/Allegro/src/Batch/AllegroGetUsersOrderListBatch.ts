import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'allegro-get-users-order-list-batch';
const LIMIT = 99;

export default class AllegroGetUsersOrderListBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const offset = Number(dto.getBatchCursor('0'));
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = `order/checkout-forms?offset=${offset}&limit=${LIMIT}`;
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            url,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.checkoutForms ?? []);
        if (response.count === LIMIT + 1) {
            dto.setBatchCursor((offset + LIMIT).toString());
        }

        return dto;
    }

}

interface IResponse {
    checkoutForms: IOutput[];
    count: number;
    totalCount: number;
}

export interface IOutput {
    id: string;
    messageToSeller: string;
    buyer: {
        id: string;
        email: string;
        login: string;
        firstName: string;
        lastName: string;
        guest: boolean;
        personalIdentity: string;
        address: {
            street: string;
            city: string;
            postCode: string;
            countryCode: string;
        };
    };
    payment: {
        id: string;
        type: string;
        provider: string;
        finishedAt: Date;
        paidAmount: {
            amount: string;
            currency: string;
        };
        reconciliation: {
            amount: string;
            currency: string;
        };
    };
    status: string;
    fulfillment: {
        status: string;
        shipmentSummary: {
            lineItemsSent: string;
        };
    };
    delivery: {
        address: {
            firstName: string;
            lastName: string;
            street: string;
            city: string;
            zipCode: string;
            countryCode: string;
        };
        method: {
            id: string;
            name: string;
        };
        pickupPoint: {
            id: string;
            name: string;
            description: string;
            address: {
                street: string;
                zipCode: string;
                city: string;
            };
        };
        cost: {
            amount: string;
            currency: string;
        };
        time: {
            guaranteed: {
                from: Date;
                to: Date;
            };
        };
        smart: boolean;
        calculatedNumberOfPackages: number;
    };
    invoice: {
        required: boolean;
        address: {
            street: string;
            city: string;
            zipCode: string;
            countryCode: string;
            company: {
                name: string;
            };
            naturalPerson: {
                firstName: string;
                lastName: string;
            };
        };
        dueDate: string;
    };
    lineItems: {
        id: string;
        offer: {
            id: string;
            name: string;
            external: {
                id: string;
            };
        };
        quantity: number;
        originalPrice: {
            amount: string;
            currency: string;
        };
        price: {
            amount: string;
            currency: string;
        };
        reconciliation: {
            value: {
                amount: string;
                currency: string;
            };
            type: string;
            quantity: number;
        };
        selectedAdditionalServices: {
            definitionId: string;
            name: string;
            price: {
                amount: string;
                currency: string;
            };
            quantity: number;
        }[];
        boughtAt: Date;
    }[];
    surcharges: {
        id: string;
        type: string;
        provider: string;
        finishedAt: Date;
        paidAmount: {
            amount: string;
            currency: string;
        };
        reconciliation: {
            amount: string;
            currency: string;
        };
    }[];
    discounts: {
        type: string;
    }[];
    summary: {
        totalToPay: {
            amount: string;
            currency: string;
        };
    };
    updatedAt: Date;
    revision: string;
}
