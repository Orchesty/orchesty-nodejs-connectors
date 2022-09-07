import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import { BASE_URL } from '../ABaseShoptet';
import APluginShoptetApplication from '../APluginShoptetApplication';

export const NAME = 'shoptet-update-order-status';

export default class ShoptetUpdateOrderStatus extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const app = this.getApplication<APluginShoptetApplication>();

        const { id, status } = dto.getJsonData();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = `${BASE_URL}/api/orders/${id}/status`;
        const requestDto = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.PATCH,
            url,
            JSON.stringify(status),
        );
        await this.getSender().send(
            requestDto,
            [200, 404, { from: 422, to: 422, action: ResultCode.STOP_AND_FAILED }],
        );

        return dto;
    }

}

export interface IInput {
    id: string;
    status: {
        data: {
            statusId: number;
        };
    };
}
