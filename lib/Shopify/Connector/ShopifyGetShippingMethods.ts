import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ShopifyApplication from '../ShopifyApplication';

export const NAME = 'shopify-get-shipping-methods';

export default class ShopifyGetShippingMethods extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutput[]>> {
        const app = this.getApplication<ShopifyApplication>();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const requestDto = app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            'admin/api/2022-07/carrier_services.json',
        );
        const res = await this.getSender().send<IResponse>(requestDto, [200]);

        return dto.setNewJsonData(res.getJsonBody().carrier_services);
    }

}

export type IOutput = ICarrier;

interface IResponse {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    carrier_services: ICarrier[];
}

interface ICarrier {
    id: number;
    name: string;
    active: boolean;
    /* eslint-disable @typescript-eslint/naming-convention */
    service_discovery: boolean;
    carrier_service_type: string;
    admin_graphql_api_id: string;
    format: string;
    callback_url: string;
    /* eslint-disable @typescript-eslint/naming-convention */
}
