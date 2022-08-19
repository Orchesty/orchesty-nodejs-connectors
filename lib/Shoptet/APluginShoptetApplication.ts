import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import HttpMethods, { parseHttpMethod } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import logger from '@orchesty/nodejs-sdk/dist/lib/Logger/Logger';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import CacheService, { ICacheCallback } from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import TopologyRunner from '@orchesty/nodejs-sdk/dist/lib/Topology/TopologyRunner';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import ABaseShoptet, { BASE_URL } from './ABaseShoptet';

export default abstract class APluginShoptetApplication extends ABaseShoptet {
  constructor(private _cache: CacheService, runner: TopologyRunner) {
    super(runner);
  }

  protected _authorizationHeader = CommonHeaders.AUTHORIZATION;

  protected _shoptetLocker = 'locker_shoptet';

  protected abstract _shoptetHost: string;

  getDescription = (): string => 'Shoptet application';

  getPublicName = (): string => 'Shoptet';

  // eslint-disable-next-line max-len
  public getLogo = (): string | null => 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAIAAACzY+a1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5QkPCCQGybZHnQAAAY5JREFUeNrt3DFKA0EUgGGzDFZqiiwq6BEEq0Bgew9jk4NYpUnraVZMGbCyFEkRkiZBEsjCpNgLpAjkqd9fTTkz3+6Ur5NzPtNvrnAFCIVQCBEKoRAKIUIhFEIhRCiEQiiECIVQCIUQoRDqJKWY22qm42Y6jrar86fX4rbvLxRCIUQohEIohAiFUAiFEKEQCqEQIhRCIRRChEIohEKIUAiFUAgRCqEQCiFCIRRChEIohEKIUAiFUAgRCqEQCiFCIdSpCjpStrjpp8fnaLv66d5dxrurTs7Zh+wh1Z94SOer9/lqEu14D/fDdlEvmnrZhNpb1UtVmUIRTj6+R2EJXz639SIW4VuZqvLCQyqECIVQCBG6AoRCKIQIhVAIhRChEAqhECIUQiEUQoRCKIRCiFAIhVAIEQqhEAohQiEUQiFEKIRCKIQIhVAIhRChEAqhDu9os7nXm9lm9xXteNdXg3YRbZ5s21GmAhuv7iEVQiFEKIRCKIQIhVAIhRChEAqhECIUQiEUQoRCKIRC+D/bA1iSNiRst5axAAAAAElFTkSuQmCC';

  public async getRequestDto(
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: string | HttpMethods,
    url?: string,
    data?: string,
  ): Promise<RequestDto> {
    const headers = {
      [this._authorizationHeader]: await this.getApiToken(applicationInstall, dto),
      [CommonHeaders.CONTENT_TYPE]: 'application/vnd.shoptet.v1.0',
    };

    return new RequestDto(
      url?.toLowerCase().includes('http') ? url : `${BASE_URL}/${url}`,
      parseHttpMethod(method),
      dto,
      data,
      headers,
    );
  }

  public getApiToken = async (
    applicationInstall: ApplicationInstall,
    processDto: AProcessDto,
  ): Promise<string> => {
    try {
      const cacheKey = `${
        this.getName()
      }ApiKey_${applicationInstall.getUser()}`;
      const lockKey = `${this._shoptetLocker}_${applicationInstall.getUser()}`;
      const settings = applicationInstall.getSettings()[AUTHORIZATION_FORM] ?? {};
      const accessToken = settings[TOKEN];
      const headers = {
        [this._authorizationHeader]: `Bearer ${accessToken}`,
      };
      const requestDto = new RequestDto(
        `${this._shoptetHost}/action/ApiOAuthServer/getAccessToken`,
        HttpMethods.GET,
        processDto,
        undefined,
        headers,
      );
      return await this._cache.entryWithLock(
        cacheKey,
        lockKey,
        requestDto,
        // eslint-disable-next-line @typescript-eslint/require-await
        async (dto): Promise<ICacheCallback<string>> => {
          const dtoBody = dto.jsonBody as unknown as {
            /* eslint-disable @typescript-eslint/naming-convention */
            expires_in: number;
            access_token: string;
            /* eslint-enable @typescript-eslint/naming-convention */
          };
          let expire = dtoBody.expires_in;
          if (expire > 30) {
            expire -= 30;
          }
          return {
            expire,
            dataToStore: dtoBody.access_token,
          };
        },
        [200],
      );
    } catch (e) {
      if (e instanceof Error) logger.error(e.message || 'Unknown error in ShoptetApplication.', processDto);
      throw e;
    }
  };
}
