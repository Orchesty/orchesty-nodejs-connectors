import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { checkErrorInResponse, ResponseState } from '../PohodaApplication';
import APohodaListBatch from './APohodaListBatch';

export enum Filter {
    LAST_CHANGES = 'lastChanges',
    DATE_FROM = 'dateFrom',
}

export default abstract class APohodaGetParameterListBatch extends APohodaListBatch<
    unknown,
    IOutput,
    Filter
> {

    protected abstract getType(): ParameterType;

    protected getKey(): string {
        return 'parameter';
    }

    protected getSchema(): string {
        return 'http://www.stormware.cz/schema/version_2/list.xsd';
    }

    // @ts-expect-error Intentionally
    protected getItems(response: IResponse): IOutput[] {
        const { responsePack } = response;
        checkErrorInResponse(responsePack);

        const { responsePackItem } = responsePack;
        checkErrorInResponse(responsePackItem);

        const { listParameter } = responsePackItem;
        checkErrorInResponse(listParameter);

        const { parameter } = listParameter;

        const { formParameter, itemParameter } = parameter;

        return [
            ...formParameter.parameterDef,
            ...itemParameter.parameterDef,
        ];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getCustomRequestAttributes(dto: BatchProcessDto): Promise<object> {
        return {
            '@_idsAgenda': this.getType(),
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getLastRunKey(dto: BatchProcessDto): Promise<string> {
        return this.getType();
    }

}

export interface IOutput {
    id: number;
    type: string;
    name: string;
    label: string;
    length?: number;
    list?: {
        id: number;
        ids: string;
    };
}

export enum ParameterType {
    ORDER = 'objednavky',
}

interface IResponse {
    responsePack: {
        responsePackItem: {
            listParameter: {
                parameter: {
                    formParameter: {
                        parameterDef: IOutput[];
                    };
                    itemParameter: {
                        parameterDef: IOutput[];
                    };
                };
            };
        };
        state: ResponseState;
        note: string;
    };
}
