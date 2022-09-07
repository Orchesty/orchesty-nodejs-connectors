import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { BASE_URL } from '../ABaseShoptet';
import APluginShoptetApplication from '../APluginShoptetApplication';

export const NAME = 'shoptet-update-remark-for-order';

export default class ShoptetUpdateRemarkForOrder extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const { id, notes } = dto.getJsonData();

        const app = this.getApplication<APluginShoptetApplication>();
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const url = `${BASE_URL}/api/orders/${id}/notes`;
        const requestDto = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.PATCH,
            url,
            JSON.stringify({ data: notes }),
        );
        await this.getSender().send(requestDto, [200, 404]);

        return dto;
    }

}

export interface IInput {
    id: string;
    notes: {
        data: {
            trackingNumber: string;
        };
    };
}
