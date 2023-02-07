import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import { commonResponseCodeRange } from '../../Common/CommonResponseCodeRanges';
import ShipstationApplication from '../ShipstationApplication';

export default class ShipstationNewOrderConnector extends AConnector {

    public getName(): string {
        return 'shipstation_new_order';
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const data = dto.getJsonData();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const url = data.resource_url ?? undefined;
        if (!url) {
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, 'Url is not set.');
            return dto;
        }

        const output = await this.getSender().send(this.getApplication<ShipstationApplication>().getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.GET,
            url,
        ), commonResponseCodeRange());

        this.evaluateStatusCode(output, dto);

        return dto.setNewJsonData(output.getBody());
    }

}

export interface IInput {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    resource_url: string;
}
