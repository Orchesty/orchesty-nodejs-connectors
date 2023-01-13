import { createPipelineRequest } from '@azure/core-rest-pipeline';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import PowerBiApplication from '../PowerBiApplication';
import APowerBiObjectConnector from './APowerBiObjectConnector';

export default class PowerBiGetAvailableFeatures extends APowerBiObjectConnector {

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const application = this.getApplication<PowerBiApplication>();
        const client = application.getClient(applicationInstall);

        try {
            const response = (await client.sendRequest(
                createPipelineRequest({
                    url: 'https://api.powerbi.com/v1.0/myorg/availableFeatures',
                    method: 'GET',
                }),
            )).bodyAsText;

            if (response) {
                const jsonResponse = JSON.parse(response) as IResponse;
                dto.setNewJsonData<IOutput>(jsonResponse.features);
            }
        } catch (e) {
            throw new OnRepeatException(60, 10, (e as Error)?.message ?? 'Unknown error.');
        }

        return dto;
    }

    protected getCustomId(): string {
        return 'get-available-features';
    }

}

export type IOutput = IFeatures[];

export interface IResponse {
    features: IFeatures[];
}

export interface IFeatures {
    name: string;
    state: string;
    extendedState: string;
    additionalInfo: {
        usage: number;
    };
}
