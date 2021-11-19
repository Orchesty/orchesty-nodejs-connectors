import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from 'pipes-nodejs-sdk/dist/lib/Utils/ResultCode';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import ShipstationApplication from '../ShipstationApplication';

export default class ShipstationNewOrderConnector extends AConnector {
  public getName = (): string => 'shipstation_new_order';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const data = dto.jsonData as { resource_url: string };
    const applicationInstall = await this._getApplicationInstallFromHeaders(dto);
    const url = data.resource_url ?? undefined;
    if (!url) {
      dto.setStopProcess(ResultCode.STOP_AND_FAILED, 'Url is not set.');
      return dto;
    }

    const output = await this._sender.send(
      (this._application as ShipstationApplication).getRequestDto(
        dto,
        applicationInstall,
        HttpMethods.GET,
        url,
      ),
    );

    this.evaluateStatusCode(output, dto);
    dto.jsonData = output.body;

    return dto;
  }
}
