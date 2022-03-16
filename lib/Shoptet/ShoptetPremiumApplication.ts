import { ABasicApplication } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods, {
  parseHttpMethod,
} from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import MongoDbClient from 'pipes-nodejs-sdk/dist/lib/Storage/Mongodb/Client';
import CurlSender from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import TopologyRunner from 'pipes-nodejs-sdk/dist/lib/Topology/TopologyRunner';
import { ILimitedApplication } from 'pipes-nodejs-sdk/dist/lib/Application/Base/ILimitedApplication';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';

export const ID = 'id';
export const NAME = 'SHOPTET';
export const SHOPTET_API_HOST = 'https://api.myshoptet.com';

const CONTENT_TYPE = 'Content-Type';
const SHOPTET_API_TOKEN = 'shoptetApiToken';

const AUTHORIZATION_HEADER = 'Shoptet-Private-API-Token';

export default class ShoptetPremiumApplication
  extends ABasicApplication
  implements ILimitedApplication {
  constructor(
    private _mongoDBClient: MongoDbClient,
    private _curlSender: CurlSender,
    private _runner: TopologyRunner,
  ) {
    super();
  }

  public injectLimit = (
    _dto: ProcessDto,
    appInstall: ApplicationInstall,
  ): ProcessDto => {
    const dto = _dto;
    dto.setLimiterWithGroup(
      `${appInstall.getUser()}|${appInstall.getName()}`,
      1,
      3,
      appInstall.getName(),
      1,
      50,
    );
    return dto;
  };

  public getDescription = (): string => 'Shoptet application';

  public getName = (): string => NAME;

  public getPublicName = (): string => 'Shoptet';

  public getRequestDto = (
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: string | HttpMethods,
    url?: string,
    data?: string,
  ): RequestDto => {
    const headers = {
      [AUTHORIZATION_HEADER]: applicationInstall.getSettings()?.[FORM]?.[SHOPTET_API_TOKEN],
      [CONTENT_TYPE]: 'application/vnd.shoptet.v1.0',
    };

    const requestDto = new RequestDto(
      url ?? '',
      parseHttpMethod(method),
      data,
      headers,
    );
    requestDto.debugInfo = dto;
    return requestDto;
  };

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, SHOPTET_API_TOKEN, 'Shoptet private API token', undefined, true));

  public getLogo = (): string | null => 'data:image/png;base64,'
    // eslint-disable-next-line max-len
    + 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAABxCAYAAAAJSffTAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAAtdEVYdENyZWF0aW9uIFRpbWUAV2VkIDE2IE1hciAyMDIyIDA5OjQwOjUxIEFNIENFVNcuY5YAAAFVSURBVHic7d1BCoMwAEVBI73/ldMTFCQV1OfMXhCf2Qgfx5xzbjzefvUNcA4hI4SMEDJCyAghI4SMEDJCyAghI4SM+Fx9A7/MObd9f+d7tvL5+51PKkjICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMuK2a6wxxtIq6UxXLMLGGEvXOZERQkYIGSFkhJARQkYIGSFkhJARQkYIGSFkhJARQkYIGSFkhJARQkYIGSFkhJARQkYIGSFkhJARQkYIGSFkhJARQkYIGSFkxJgH1qSr48t/XT10fRInMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIw49Lc6Y5r7cyIjhIwQMkLICCEjhIwQMkLIiC943hriZDYXygAAAABJRU5ErkJggg==';

  public static shoptetDateISO(date: string): string {
    if (!date) {
      return '';
    }
    try {
      return `${new Date(date).toISOString()
        .split('.')[0]}Z`;
    } catch (e) {
      throw new Error(`${date} is not in the correct format`);
    }
  }
}
