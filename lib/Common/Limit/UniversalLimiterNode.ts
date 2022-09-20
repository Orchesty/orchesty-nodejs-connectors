import { ILimitedApplication } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/ILimitedApplication';
import ACommonNode from '@orchesty/nodejs-sdk/dist/lib/Commons/ACommonNode';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export default class UniversalLimiterNode extends ACommonNode {

    public constructor(private readonly name: string) {
        super();
    }

    public getName(): string {
        return this.name;
    }

    public async processAction(dto: ProcessDto<IInputJson>): Promise<ProcessDto> {
        const { noLimit } = dto.getJsonData();
        if (noLimit) {
            return dto;
        }
        const appInstall = await this.getApplicationInstallFromProcess(dto, null);

        return (this.getApplication() as unknown as ILimitedApplication).injectLimit(dto, appInstall) as ProcessDto;
    }

}

export interface IInputJson {
    noLimit: boolean;
}
