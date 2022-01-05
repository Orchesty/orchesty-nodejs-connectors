import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from 'pipes-nodejs-sdk/dist/lib/Utils/Validations';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import WebflowApplication from '../WebflowApplication';

const WEBFLOW_CREATE_PRODUCT_ENDPOINT = '/sites/replace_me/products';

interface IWebflowProduct {
  userName: string,
  name: string,
  description: string,
  slug: string,
  price: number,
  draft: boolean,
  archived: boolean,
  currency: string,
  siteId: string
}

export default class WebflowAddProductConnector extends AConnector {
  public getName = (): string => 'webflow-create-product';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { jsonData } = dto;
    checkParams(
      jsonData as Record<string, unknown>,
      ['name', 'description', 'slug', 'price', 'userName', 'draft', 'archived', 'currency', 'siteId'],
    );

    const {
      name,
      description,
      slug,
      price,
      userName,
      draft,
      archived,
      currency,
      siteId,
    } = jsonData as IWebflowProduct;

    const application = this._application as WebflowApplication;
    const applicationInstall = await this._getApplicationInstall(userName);

    const data = {
      product: {
        name,
        fields: {
          name,
          slug,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          _draft: draft,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          _archived: archived,
        },
        description,
      },
      sku: {
        fields: {
          name,
          slug,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          _draft: draft,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          _archived: archived,
          price: {
            value: price,
            unit: currency,
          },
        },
      },
    };

    const request = await application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.POST,
      WEBFLOW_CREATE_PRODUCT_ENDPOINT.replace('replace_me', siteId),
      JSON.stringify(data),
    );

    const response = await this._sender.send(request, [200]);
    dto.data = response.body;
    return dto;
  }
}
