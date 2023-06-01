import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'woo-commerce-get-order-notes';

export default class WooCommerceGetOrderNotes extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id } = dto.getJsonData();

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `wp-json/wc/v3/orders/${id}/notes`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return this.setNewJsonData(dto, resp);
    }

    protected setNewJsonData(dto: ProcessDto<IInput>, resp: ResponseDto<IResponse>): ProcessDto<IOutput> {
        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export type IResponse = IOrderNote[];

export interface IInput {
    id: string;
}

export type IOutput = IResponse;

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOrderNote {
    id: number;
    author: string;
    date_created: string;
    date_created_gmt: string;
    note: string;
    customer_note: boolean;
    _links: {
        self: {
            href: string;
        }[];
        collection: {
            href: string;
        }[];
        up: {
            href: string;
        }[];
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
