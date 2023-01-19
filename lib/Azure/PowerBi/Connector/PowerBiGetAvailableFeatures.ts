import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import { ORGANIZATION } from '../../AAzureApplication';
import PowerBiApplication from '../PowerBiApplication';
import APowerBiObjectConnector from './APowerBiObjectConnector';

export default class PowerBiGetAvailableFeatures extends APowerBiObjectConnector {

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const application = this.getApplication<PowerBiApplication>();
        const client = application.getClient(applicationInstall);
        const organization = applicationInstall.getSettings()?.[CoreFormsEnum.AUTHORIZATION_FORM]?.[ORGANIZATION];

        if (!organization) {
            return dto.setStopProcess(
                ResultCode.STOP_AND_FAILED,
                'Missing field "organization" in application settings',
            );
        }

        try {
            const response = (await client.sendRequest(
                this.getPipelineRequest(organization, 'availableFeatures', HttpMethods.GET),
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
