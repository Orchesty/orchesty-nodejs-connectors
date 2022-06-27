import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { BASE_URL } from '../IDokladApplication';

export default class IDokladNewInvoiceReceivedConnector extends AConnector {
  public getName = (): string => 'i-doklad-new-invoice-recieved';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { jsonData } = dto;
    checkParams(
      jsonData as Record<string, unknown>,
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
      jsonData as Record<string, unknown>,
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
      dto.data,
    );

    const response = await this._sender.send(request, [200, 201], 10);
    dto.data = response.body;

    return dto;
  }
}
