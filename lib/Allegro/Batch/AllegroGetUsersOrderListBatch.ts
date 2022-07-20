import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'allegro-get-users-order-list-batch';
const LIMIT = 99;

export default class AllegroGetUsersOrderListBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const offset = Number(dto.getBatchCursor('0'));
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = `order/checkout-forms?offset=${(offset * LIMIT) + offset ? 1 : 0}&limit=${LIMIT}`;
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      url,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.checkoutForms ?? []);
    if (response.count === LIMIT + 1) {
      dto.setBatchCursor((offset + 1).toString());
    }
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

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
    lineItems: [{
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
        selectedAdditionalServices: [{
            definitionId: string;
            name: string;
            price: {
                amount: string;
                currency: string;
            };
            quantity: number;
        }];
        boughtAt: Date;
    }];
    surcharges: [{
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
    }];
    discounts: [{
        type: string;
    }];
    summary: {
        totalToPay: {
            amount: string;
            currency: string;
        };
    };
    updatedAt: Date;
    revision: string;
}
/* eslint-enable @typescript-eslint/naming-convention */
