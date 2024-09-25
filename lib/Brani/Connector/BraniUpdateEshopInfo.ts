import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'brani-update-eshop-info-connector';

export default class BraniUpdateEshopInfo extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto, null),
            HttpMethods.POST,
            'eshop/info',
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    data: {
        orderStatuses: {
            statuses:
            {
                id: number;
                name: string;
            }[]
        },
        shippingMethods: {
            retail: {
                methods:
                {
                    guid: string;
                    name: string;
                }[]
            },
            wholesale: {
                methods:
                {
                    guid: string;
                    name: string;
                }[]
            }
        },
        paymentMethods: {
            retail: {
                methods:
                {
                    guid: string;
                    name: string;
                }[]
            },
            wholesale: {
                methods:
                {
                    guid: string;
                    name: string;
                }[]
            }
        }
    }
}

export interface IOutput {
    detail: string;
}
