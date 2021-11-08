import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from 'pipes-nodejs-sdk/dist/lib/Utils/Validations';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { BASE_URL } from '../IDokladApplication';

export default class IDokladNewInvoiceReceivedConnector extends AConnector {
  public getName = (): string => 'i-doklad-new-invoice-recieved';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const data = JSON.parse(dto.data);
    checkParams(
      data,
      [
        'DateOfMaturity',
        'DateOfReceiving',
        'Description',
        'DocumentSerialNumber',
        'IsIncomeTax',
        'PartnerId',
        'PaymentOptionId',
      ],
    );
    checkParams(
      data,
      {
      // eslint-disable-next-line @typescript-eslint/naming-convention
        Items: [
          [
            'Name',
            'PriceType',
            'UnitPrice',
            'VatRateType',
          ],
        ],
      },
    );

    const applicationInstall = await this._getApplicationInstallFromHeaders(dto);

    const request = await this._application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.POST,
      `${BASE_URL}/ReceivedInvoices`,
      data,
    );

    const response = await this._sender.send(request, [200, 201], 10);
    dto.data = response.body;

    return dto;
  }
}
