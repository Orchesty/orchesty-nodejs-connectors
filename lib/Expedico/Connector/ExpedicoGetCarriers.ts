import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'expedico-get-carriers';

export default class ExpedicoGetCarriers extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutput>> {
        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            'carriers',
        );

        const resp = await this.getSender().send<IOutput>(requestDto, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IOutput {
    data: {
        attributes: {
            labelEn: string;
            sys: string;
        };
        id: string;
        links: {
            self: string;
        };
        relationships: {
            countries: {
                links: {
                    related: string;
                };
            };
        } ;
        type: string;
    }[];
    jsonapi: {
        version: string;
    };
}
