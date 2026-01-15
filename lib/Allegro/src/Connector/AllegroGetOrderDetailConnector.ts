import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'allegro-get-order-detail-connector';

export default class AllegroGetOrderDetailConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = `order/checkout-forms/${id}`;
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.GET, url);
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    id: string;
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
