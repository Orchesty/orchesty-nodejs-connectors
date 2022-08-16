import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'authentica-put-products';

export default class AuthenticaPutProducts extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;

    const { products } = dto.jsonData as IInput;

    const requestDto = await this._application.getRequestDto(
      dto,
      await this._getApplicationInstallFromProcess(dto),
      HttpMethods.POST,
      'products',
      products,
    );

    const response = (await this._sender.send(requestDto, [200])).jsonBody as IOutput;

    dto.jsonData = response.data;

    return dto;
  }
}

export interface IProduct{
      sku: string,
      name: string,
      englishName: string,
      ean: string,
      width: number,
      widthUnit: string,
      height: number,
      heightUnit: string,
      weight: number,
      weightUnit: string
}
export interface IOutput {
    data: IProduct[]
}

export interface IInput{
    products: IProduct[]
}
