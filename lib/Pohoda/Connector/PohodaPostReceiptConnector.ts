import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkErrorInResponse, NAME as APPLICATION_NAME, ResponseState } from '../PohodaApplication';
import APohodaConnector from './APohodaConnector';

export const NAME = `${APPLICATION_NAME}-post-receipt-connector`;

export default class PohodaPostReceiptConnector extends APohodaConnector<IInput, IOutput, IResponse> {

    public getName(): string {
        return NAME;
    }

    protected getSchema(): string {
        return 'http://www.stormware.cz/schema/version_2/prijemka.xsd';
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async createItemData(dto: ProcessDto<IInput>): Promise<object> {
        return {
            /* eslint-disable @typescript-eslint/naming-convention */
            'itemData:prijemka': {
                '@_version': '2.0',
                ...dto.getJsonData(),
            },
            /* eslint-enable @typescript-eslint/naming-convention */
        };
    }

    protected getItemData(data: IResponse): IOutput {
        checkErrorInResponse(data.prijemkaResponse.importDetails?.detail);

        return data.prijemkaResponse.producedDetails;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getCustomDataPackAttributes(dto: ProcessDto<IInput>): Promise<object> {
        return {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '@_xmlns:type': 'http://www.stormware.cz/schema/version_2/type.xsd',
        };
    }

}

export interface IInput {
    /* eslint-disable @typescript-eslint/naming-convention */
    'itemData:prijemkaHeader': {
        'itemData:partnerIdentity': {
            'type:address': {
                'type:company': string;
            };
        };
        'itemData:intNote'?: string;
    };
    'itemData:prijemkaDetail': {
        'itemData:prijemkaItem': {
            'itemData:quantity': number;
            'itemData:stockItem': {
                'type:stockItem': {
                    'type:id': number;
                };
            };
        }[];
    };
    /* eslint-enable @typescript-eslint/naming-convention */
}

export interface IResponse {
    prijemkaResponse: {
        importDetails?: {
            detail: {
                state: ResponseState;
                note: string;
            }[];
        };
        producedDetails: IOutput;
    };
}

export interface IOutput {
    id: number;
    number: string;
    actionType: string;
    itemDetails: {
        item: {
            actionType: string;
            producedItem: {
                id: number;
            };
        };
        type: string;
    };
}
