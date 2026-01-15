import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'brani-eshop-info-connector';

export default class BraniEshopInfo extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutput>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto, null),
            HttpMethods.GET,
            'eshop/info',
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IOutput {
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
