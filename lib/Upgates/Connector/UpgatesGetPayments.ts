import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'upgates-get-payments';
const GET_PAYMENTS_ENDPOINT = 'api/v2/payments';

export default class UpgatesGetPayments extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutput>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            GET_PAYMENTS_ENDPOINT,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    current_page: number;
    current_page_items: number;
    number_of_pages: number;
    number_of_items: number;
    payments: IPayment[];
}

export interface IPayment {
    id: string;
    code: string;
    image_url: string;
    type: string;
    active_yn: boolean;
    descriptions: {
        language_id: string;
        name: string;
        description: string;
        price: number;
        price_type: string;
        free_from: number;
    }[];
    metas: {
        key: string;
        type: string;
        value: string;
        values: {
            language: string;
            value: string;
        }[];
    }[];
}
/* eslint-enable @typescript-eslint/naming-convention */
