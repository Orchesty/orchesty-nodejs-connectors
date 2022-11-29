import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import PowerBiApplication from '../PowerBiApplication';
import APowerBiObjectConnector from './APowerBiObjectConnector';

export default class PowerBiGetAvailableFeatures extends APowerBiObjectConnector {

    public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
        const dto = _dto;

        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const application = this.getApplication<PowerBiApplication>();
        const client = application.getClient(applicationInstall);

        try {
            await client.sendRequest({
                agent: '',
            });
        } catch (e) {
            throw new OnRepeatException(60, 10, (e as Error)?.message ?? 'Unknown error.');
        }

        return dto;
    }

    protected getCustomId(): string {
        return 'get-available-features';
    }

}
