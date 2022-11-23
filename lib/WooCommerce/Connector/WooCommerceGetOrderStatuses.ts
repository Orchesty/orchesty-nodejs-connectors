import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'woo-commerce-get-order-statuses';

export default class WooCommerceGetOrderStatuses extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IResponse[]>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            'wp-json/wc/v3/reports/orders/totals?per_page=1000',
        );
        const resp = await this.getSender().send<IResponse[]>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

interface IResponse {
    slug: string;
    name: string;
}
