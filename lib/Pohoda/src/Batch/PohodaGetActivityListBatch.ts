import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { checkErrorInResponse, NAME as APPLICATION_NAME, ResponseState } from '../PohodaApplication';
import APohodaListBatch from './APohodaListBatch';

export const NAME = `${APPLICATION_NAME}-get-activity-list-batch`;

export const LAST_RUN_KEY = 'activity';

export enum Filter {
    LAST_CHANGES = 'lastChanges',
    DATE_FROM = 'dateFrom',
}

export default class PohodaGetActivityListBatch extends APohodaListBatch<unknown, IOutput, Filter> {

    public getName(): string {
        return NAME;
    }

    protected getKey(): string {
        return LAST_RUN_KEY;
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

        const { listActivity } = responsePackItem;
        checkErrorInResponse(listActivity);

        const { itemActivity } = listActivity;
        checkErrorInResponse(itemActivity);

        return itemActivity;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getCustomListRequestAttributes(dto: BatchProcessDto): Promise<object> {
        return {
            /* eslint-disable @typescript-eslint/naming-convention */
            '@_version': '1.1',
            '@_activityVersion': undefined,
            'itemData:limit': undefined,
            'itemData:requestActivity': undefined,
            /* eslint-enable @typescript-eslint/naming-convention */
        };
    }

}

export interface IOutput {
    id: number;
    code: string;
    name: string;
}

interface IResponse {
    responsePack: {
        responsePackItem: {
            listActivity: {
                itemActivity: IOutput[];
            };
        };
        state: ResponseState;
        note: string;
    };
}
