import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkErrorInResponse, NAME as APPLICATION_NAME, ResponseState } from '../PohodaApplication';
import APohodaConnector from './APohodaConnector';

export const NAME = `${APPLICATION_NAME}-put-stock-connector`;

export default class PohodaPutStockConnector extends APohodaConnector<IInput, IOutput, IResponse> {

    public getName(): string {
        return NAME;
    }

    protected getSchema(): string {
        return 'http://www.stormware.cz/schema/version_2/stock.xsd';
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async createItemData(dto: ProcessDto<IInput>): Promise<object> {
        const { id, ...data } = dto.getJsonData();

        return {
            /* eslint-disable @typescript-eslint/naming-convention */
            'itemData:stock': {
                '@_version': '2.0',
                'itemData:actionType': {
                    'itemData:update': {
                        'filter:filter': {
                            'filter:id': id,
                        },
                    },
                },
                'itemData:stockHeader': Object.entries(data).map(([key, value]) => ({ [`itemData:${key}`]: value })),
            },
            /* eslint-enable @typescript-eslint/naming-convention */
        };
    }

    protected getItemData(data: IResponse): IOutput {
        checkErrorInResponse(data.stockItemResponse.importDetails?.detail);

        return data.stockItemResponse.producedDetails;
    }

}

export interface IInput {
    id: number;
    count: number;
}

export interface IResponse {
    stockItemResponse: {
        importDetails?: {
            detail: {
                state: ResponseState;
                note: string;
            };
        };
        producedDetails: {
            id: string;
            code: string;
        };
    };
}

export interface IOutput {
    id: string;
    code: string;
}
